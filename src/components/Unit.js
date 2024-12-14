import React, { useCallback, useEffect, useState } from "react";
import { styled } from 'styled-components';
import LectureUnit from "./LectureUnit";
import { getLectureAPI, getLectureDetailAPI } from "../apis/API";

export default function Unitslide () {
    const [groupedLectures, setGroupedLectures] = useState([]);
    const [page, setPage] = useState(1);

    const getLectures = useCallback(async () => {
        try {
            const res = await getLectureAPI(page, 30);

            const filtered = res.filter((lecture) => lecture.public_yn === "Y");

            const details = await Promise.all(
                filtered.map(async (lecture) => {
                    const detail = await getLectureDetailAPI(lecture.id);
                    if (!detail.classfy_name) return null; // classfy_name이 없는 데이터 필터링
                    return { ...detail, classfy_name: detail.classfy_name };
                })
            );

            const grouped = details.reduce((acc, detail) => {
                if (!detail) return acc; // 필터링된 null 값 건너뜀
                if (!acc[detail.classfy_name]) {
                    acc[detail.classfy_name] = [];
                }
                acc[detail.classfy_name].push(detail);
                return acc;
            }, {});

            setGroupedLectures(grouped);
        } catch (err) {
            console.error(err);
        }
    }, [page]);

    useEffect(() => {
        getLectures();
    }, [getLectures]);

    const prevData = () => {
        if (page > 1) { // 페이지가 1보다 클 때만 감소
            setGroupedLectures([]); // 기존 데이터를 초기화
            setPage((prevPage) => prevPage - 1); // 페이지를 감소시킴
        }
    };
    
    const nextData = () => {
        setGroupedLectures([]); // 기존 데이터를 초기화
        setPage((prevPage) => prevPage + 1); // 페이지를 증가시킴
    };

    return (
        <div>
            <Topdiv>
                <SliderButtonWrapper>
                    <ButtonWrapper>
                        <SliderButton onClick={prevData}>
                            <PreButtonSpan>
                                <svg xmlns="http://www.w3.org/2000/svg" className="svg css-uwwqev" viewBox="0 0 5 9">
                                    <path stroke="currentColor" d="M1 1l3 3.5L1 8" fill="none" fillRule="evenodd"></path>
                                </svg>
                            </PreButtonSpan>
                        </SliderButton>
                    </ButtonWrapper>
                    <span>Page {page}</span> {/* 페이지 번호 표시 */}
                    <ButtonWrapper>
                        <SliderButton onClick={nextData}>
                            <NextButtonSpan>
                                <svg xmlns="http://www.w3.org/2000/svg" className="svg css-uwwqev" viewBox="0 0 5 9">
                                    <path stroke="currentColor" d="M1 1l3 3.5L1 8" fill="none" fillRule="evenodd"></path>
                                </svg>
                            </NextButtonSpan>
                        </SliderButton>
                    </ButtonWrapper>
                </SliderButtonWrapper>
            </Topdiv>
            {Object.keys(groupedLectures).map((classfy_name) => (
                <Div key={classfy_name}>
                    <InnerDiv>
                        <SliderWrapper>
                            <LinkWrapper href="/">
                                <SliderLabel>
                                    {classfy_name}
                                    <AllowWrapper>
                                        <path d="M8.97 4.47a.75.75 0 0 1 1.06 0L17.56 12l-7.53 7.53a.75.75 0 1 1-1.06-1.06L15.44 12 8.97 5.53a.75.75 0 0 1 0-1.06" clipRule="evenodd" fillRule="evenodd"></path>
                                    </AllowWrapper>
                                </SliderLabel>
                            </LinkWrapper>
                        </SliderWrapper>
                        <UnitlistWrapper>
                            {groupedLectures[classfy_name]?.slice(0, 4).map((lecture) => (
                                <UnitWrapper key={lecture.id}>
                                    <LectureUnit lecture_id={lecture.id} />
                                </UnitWrapper>
                            ))}
                        </UnitlistWrapper>
                    </InnerDiv>
                </Div>
            ))}
        </div>
    );
}

const Div = styled.div`
display: flex;
align-items: center;
justify-content: center;
`
const Topdiv = styled.div`
margin-top: 10px;
display: flex;
align-items: center;
justify-content: center;
`

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

const SliderButtonWrapper = styled.div`
display: flex;
flex-direction: right;
`

const ButtonWrapper = styled.div`
margin-left: 10px;
`

const SliderButton = styled.button`
cursor: pointer;
padding: 0;
border: none;
border-radius: 50%;
font: inherit;
background-color: rgb(50, 50, 54);
position: relative;
width: 30px;
height: 30px;
display: flex;
align-items: center;
justify-content: center;
margin: 0;
vertical-align: middle;
white-space: normal;
outline: none;
user-select: none;
appearance: none;
`

const PreButtonSpan = styled.span`
color: #fff;
fill: #fff;
transform: scaleX(-1);
padding-left: 10px;
opacity: 0.5;
z-index: 1;
display: flex;
line-height: 0;
width: 18px;
height: 18px;
cursor: default;
pointer-events: none;
`

const NextButtonSpan = styled.span`
color: #fff;
fill: #fff;
opacity: 1;
z-index: 1;
display: flex;
padding-left: 10px;
line-height: 0;
width: 18px;
height: 18px;
cursor: default;
pointer-events: none;
`

const UnitlistWrapper = styled.div`
display: flex;
overflow: hidden;
justify-content: flex-start;
margin: 0px 10px 0px 10px;
gap: 10px;
`

const UnitWrapper = styled.div`
max-width: 280px;
backface-visibility: hidden;
transform: translateZ(0);
height: auto;
display: block;
flex-shrink: 0;
position: relative;
transition-property: transform;
`
