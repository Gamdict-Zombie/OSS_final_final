import React, { useEffect, useState, useRef } from "react";
import { styled } from 'styled-components';
import LectureUnit from "./LectureUnit";
import { getLectureAPI } from "../apis/API";

export default function Unitslide() {
    const [lectures, setLectures] = useState([]);
    const [page, setPage] = useState(1);
    const [isLoading, setIsLoading] = useState(false);
    const [isLastPage, setIsLastPage] = useState(false); // 마지막 페이지 여부
    const observerRef = useRef();

    const getLectures = async () => {
        if (isLoading || isLastPage) return;
        setIsLoading(true);
        try {
            const res = await getLectureAPI(page, 30);
            const filtered = res.filter((lecture) => lecture.public_yn === "Y");

            if (filtered.length === 0) {
                setIsLastPage(true);
            } else {
                setLectures((prevLectures) => {
                    const newLectures = filtered.filter(
                        (newLecture) => !prevLectures.some((prev) => prev.id === newLecture.id)
                    );
                    return [...prevLectures, ...newLectures];
                });
            }
        } catch (err) {
            console.error(err);
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        getLectures();
    }, [page]);

    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                if (entries[0].isIntersecting && !isLoading && !isLastPage) {
                    setPage((prevPage) => prevPage + 1);
                }
            },
            { threshold: 0.5 }
        );

        if (observerRef.current) {
            observer.observe(observerRef.current);
        }

        return () => {
            if (observerRef.current) observer.disconnect();
        };
    }, [isLoading, isLastPage]);

    return (
        <div>
            <Div>
                <InnerDiv>
                    <SliderWrapper>
                        <LinkWrapper href="/">
                            <SliderLabel>오픈 강좌</SliderLabel>
                        </LinkWrapper>
                    </SliderWrapper>
                    <UnitlistWrapper>
                        {lectures.map((lecture) => (
                            <UnitWrapper key={lecture.id}>
                                <LectureUnit lecture={lecture} />
                            </UnitWrapper>
                        ))}
                        <div ref={observerRef} style={{ height: "20px", background: "transparent" }} />
                    </UnitlistWrapper>
                </InnerDiv>
            </Div>
        </div>
    );
}

const Div = styled.div`
display: flex;
align-items: center;
justify-content: center;
`
// const Topdiv = styled.div`
// margin-top: 10px;
// display: flex;
// align-items: center;
// justify-content: center;
// `

const InnerDiv = styled.div`
width: 85%;
display: block;
`

const SliderWrapper = styled.div`
display: flex;
height: 60px;
justify-content: space-between;
margin: 18px 10px 18px 10px;
color: #fff;
`

const LinkWrapper = styled.div`
text-decoration: none;
`

const SliderLabel = styled.div`
display: flex;
align-items: center;
color: #fff;
font-weight: 700;
line-height: 125%;
letter-spacing: 0.02em;
font-size: 1.25rem;
margin: 0;
padding: 0;
`

const AllowWrapper = styled.svg`
margin-left: 5px;
vertical-align: middle;
height: 24px;
width: 24px;
fill: currentColor;
user-select: none;
pointer-events: none;
`
// const SliderButtonWrapper = styled.div`
// display: flex;
// flex-direction: right;
// `

// const ButtonWrapper = styled.div`
// margin-left: 10px;
// `

// const SliderButton = styled.button`
// cursor: pointer;
// pointer-events: none;
// padding: 0;
// border: none;
// border-radius: 50%;
// font: inherit;
// background-color: rgb(50, 50, 54);
// position: relative;
// width: 30px;
// height: 30px;
// display: flex;
// align-items: center;
// justify-content: center;
// margin: 0;
// vertical-align: middle;
// white-space: normal;
// outline: none;
// user-select: none;
// appearance: none;
// `

// const PreButtonSpan = styled.span`
// color: #fff;
// fill: #fff;
// transform: scaleX(-1);
// padding-left: 10px;
// opacity: 0.5;
// z-index: 1;
// display: flex;
// line-height: 0;
// width: 18px;
// height: 18px;
// cursor: default;
// pointer-events: none;
// `

// const NextButtonSpan = styled.span`
// color: #fff;
// fill: #fff;
// opacity: 1;
// z-index: 1;
// display: flex;
// padding-left: 10px;
// line-height: 0;
// width: 18px;
// height: 18px;
// cursor: default;
// pointer-events: none;
// `

const UnitlistWrapper = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 20px;
  padding: 10px;
  justify-items: center;
`;

const UnitWrapper = styled.div`
  width: 300px;
  height: 400px; /* 일정한 높이 */
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  border-radius: 10px;
  background: #121212;
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.3);
  padding: 10px;
  overflow: hidden;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  &:hover {
    transform: translateY(-5px);
    box-shadow: 0px 6px 12px rgba(0, 0, 0, 0.5);
  }
`;