import React, { useCallback, useEffect, useState } from "react";
import { styled } from 'styled-components'
import { getLectureDetailAPI, postDataAPI } from "../apis/API";

export default function LectureUnit ({lecture_id}) {
    const [lectureDetail, setDetailedLecture] = useState([]);
    const [isHovered, setIsHovered] = useState(false);

    const getLectureDetail = useCallback(async () => {
        try {
            // 기본 강의 목록 가져오기
            const res = await getLectureDetailAPI(lecture_id);
            setDetailedLecture(res);

        } catch (err) {
            console.error(err);
        }
    }, [lecture_id]);

    useEffect(() => {
        getLectureDetail();
    }, [getLectureDetail]);

    const saveData = async (data) => {
        try {
            const res = await postDataAPI(data);
            console.log(res);
        } catch (err) {
            console.error(err);
        }
    }

    return (
        <Div 
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
        >
            <UnitLink href='/'>
                <UnitLayout>
                    <UnitImgWrapper>
                        <UnitImag src={lectureDetail.course_image}/>
                    </UnitImgWrapper>
                    <UnitDetailWrapper>
                        <UnitCategoryLabel>{lectureDetail.classfy_name}</UnitCategoryLabel>
                        <UnitTitle>{lectureDetail.name}</UnitTitle>
                        <UnitInstructor>{lectureDetail.professor}</UnitInstructor>
                    </UnitDetailWrapper>
                </UnitLayout>
            </UnitLink>
            <UnitWishlistWrapper $isActive={isHovered}>
                <WishlistButton type="button" onClick={() => saveData(lectureDetail)}>+</WishlistButton>
            </UnitWishlistWrapper>
        </Div>
    )
}

const Div = styled.div`
.hover-trigger:hover + .target {
    opacity: 1;
}
`

const UnitLink = styled.a`
//position: relative;
display: flex;
`

const UnitLayout = styled.div`
display: flex;
flex-direction: column;
height: 100%;
margin-bottom: 10px;
`

const UnitImgWrapper = styled.div`
display: block;
width: 100%;
overflow: hidden;
border-radius: 8px;
height: 100%;
`
const UnitImag = styled.img`
width: auto;
height: auto;
max-width: 100%;
max-height: 100%;
background: linear-gradient(rgb(32. 32. 36), rgb(24, 24, 28));
overflow: hidden;
border-radius: 8px;
`

const UnitDetailWrapper = styled.div`
display: flex;
flex-direction: column;
align-items: flex-start;
text-align: left;
gap: 10px;
`

const UnitCategoryLabel = styled.span`
color: rgba(255, 255, 255, 0.65);
font-size: 0.75rem;
line-height: 150%;
font-weight: 400;
letter-spacing: 0.02em;
margin: 0;
padding: 0;
`

const UnitTitle = styled.span`
margin: 5px 0 5px 0;
color: #fff;
font-size: 0.9rem;
font-weight: 700;
letter-spacing: 0.02em;
line-height: 125%;
padding: 0;
text-align: left;
white-space: normal;
overflow-wrap: break-word;
`

const UnitInstructor = styled.span`
margin-top: 10px 0 0 0;
padding: 0;
//display: flex;
flex-direction: row;
align-items: center;
//flex-wrap: wrap;
color: #fff;
font-weight: 400;
letter-spacing: 0.02em;
font-size: 0.875rem;
line-height: 140%;
`

const UnitWishlistWrapper = styled.div`
position: absolute;
top: 10px;
right: 10px;
transition: opacity 125ms ease-in-out;
opacity: ${(props) => (props.$isActive ? 1 : 0)};
z-index: 1;
`

const WishlistButton = styled.button`
cursor: pointer;
position: relative;
color: #fff;
width: 44px;
height: 44px;
display: flex;
justify-content: center;
margin: 0;
padding: 0;
align-items: center;
width: 20px;
height: 20px;
border-radius: 50%;
border: 2px solid rgb(255, 255, 255);
background: rgb(16, 16, 20);
box-shadow: rgba(0, 0, 0, 0.6);
`