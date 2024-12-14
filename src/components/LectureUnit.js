import React, { useState } from "react";
import { styled } from 'styled-components'
import { postDataAPI } from "../apis/API";

export default function LectureUnit ({lecture}) {
    const [isHovered, setIsHovered] = useState(false);

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
                        <UnitImag src={lecture.course_image}/>
                    </UnitImgWrapper>
                    <UnitDetailWrapper>
                        <UnitCategoryLabel>{lecture.classfy_name}</UnitCategoryLabel>
                        <UnitTitle>{lecture.name}</UnitTitle>
                        <UnitInstructor>{lecture.professor}</UnitInstructor>
                    </UnitDetailWrapper>
                </UnitLayout>
            </UnitLink>
            <UnitWishlistWrapper $isActive={isHovered}>
                <WishlistButton type="button" onClick={() => saveData(lecture)}>+</WishlistButton>
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
width: 100%;
height: 180px;
position: relative;
padding-bottom: calc(63%);
background: linear-gradient(rgb(32, 32, 36), rgb(24, 24, 28));
color: rgba(255, 255, 255, 0.65);
overflow: hidden;
border-radius: 8px;

`
const UnitImag = styled.img`
width: 100%;
height: 180px;
top: 50%;
left: 50%;
overflow: hidden;
border-radius: 8px;
position: absolute;
transform: translate(-50%, -50%);
object-fit: cover;
`

const UnitDetailWrapper = styled.div`
display: flex;
flex-direction: column;
align-items: flex-start;
text-align: left;
gap: 10px;
width:300px;
padding: 10px;
`

const UnitCategoryLabel = styled.span`
color: rgba(255, 255, 255, 0.65);
font-size: 0.75rem;
line-height: 150%;
font-weight: 400;
letter-spacing: 0.02em;
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