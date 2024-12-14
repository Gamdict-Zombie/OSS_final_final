import React, { useEffect, useState, useRef, useCallback } from "react";
import { styled } from 'styled-components';
import LectureUnit from "./LectureUnit";
import { getLectureAPI } from "../apis/API";

export default function Unitslide() {
    const [lectures, setLectures] = useState([]);
    const [page, setPage] = useState(1);
    const [isLoading, setIsLoading] = useState(false);
    const [isLastPage, setIsLastPage] = useState(false);
    const observerRef = useRef();

    const getLectures = useCallback(async () => {
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
    }, [isLoading, isLastPage, page]);

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

    useEffect(() => {
        getLectures();
    }, [getLectures]);

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
`;

const InnerDiv = styled.div`
width: 85%;
display: block;
`;

const SliderWrapper = styled.div`
display: flex;
height: 60px;
justify-content: space-between;
margin: 18px 10px 18px 10px;
color: #fff;
`;

const LinkWrapper = styled.div`
text-decoration: none;
`;

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
`;

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
