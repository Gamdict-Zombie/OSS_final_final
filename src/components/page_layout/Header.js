import { Link, Outlet } from "react-router-dom";
import styled from "styled-components";
import logo from "../svg/logo_online.svg"
import wishlogo from "../svg/wishlist.svg"

export const Header = () => {
    return (
        <div>
            <HeaderWrapper>
                <Headerbackground />
                <StyledLink to="/">
                    <Logo src={logo} alt="logo" />
                    <WebTitle>EPIC Online Lecture</WebTitle>
                </StyledLink>
                <WishlistLink to = "/wishlist">
                    <Wishlogo src={wishlogo} alt="wishlogo" />
                    <Wishtitle>Wish List</Wishtitle>
                </WishlistLink>
            </HeaderWrapper>
            <Outlet />
            <FooterWrapper>
                <FooterInnerWrap>
                    <Footinfo>
                        This page is a assignment of Handong University
                        <br/>
                        using kmook open api
                    </Footinfo>
                </FooterInnerWrap>
                <Footunder>
                    <Footmoreinfo>
                        © 2024 Epic Online Lecture Inc. All rights reserved.
                    </Footmoreinfo>
                </Footunder>
            </FooterWrapper>
        </div>
    );
};

const HeaderWrapper = styled.div`
column-gap: 1.75rem;
align-items: center;
box-sizing: border-box;
display: flex;
height: 4.5rem;
padding-block: 1.25rem;
padding-inline: 1rem;
position: relative;
width: 100%;
z-index: 9000;
justify-content: space-between;
`
const Headerbackground = styled.div`
background: rgba(26, 26, 30);
position: absolute;
overflow: hidden;
z-index: -1;
display: block;
inset: 0;
`


const Logo = styled.img`
height: 65px;
width: 65px;
font-size: 2rem;
color: #fff;
fill: #fff;
cursor: pointer;

`

const StyledLink = styled(Link)`
display: flex;
align-items: center;
justify-content: center;
text-decoration: none;  // 밑줄 제거
color: inherit;         // 링크 색상 제거 (부모 컴포넌트의 색상을 상속)
text-align: center;
align-items: center;
`

const WebTitle = styled.span`
display: inline-block;
color: #fff;
font-size: 1.5rem;
font-weight: 700;
letter-spacing: 0.02em;
line-height: 125%;
padding: 0;
margin-left: 10px;
`
const WishlistLink = styled(Link)`
display: flex;
align-items: center;
justify-content: center;
color: #fff;
font-size: 1.25rem;
font-weight: 400;
letter-spacing: 0.02em;
line-height: 125%;
text-decoration: none;  // 밑줄 제거
`

const FooterWrapper = styled.footer`
background-color: #202020;
padding: 10px 0 70px;
`

const FooterInnerWrap = styled.div`
margin: 16px auto 0 auto;
padding: 0 16px;
`

const Footinfo = styled.h5`
font-size: 12px;
text-align: center;
line-height: 1.5;
color: #727585;
font-weight: normal;
margin: 0;
`

const Footunder = styled.div`
display: flex;
align-items: center;
justify-content: center;
margin: 0 0 16px 0;
gap: 8px;
`

const Footmoreinfo = styled.h6`
font-size: 11px;
line-height: 1.7em;
letter-spacing: -0.4px;
margin: 16px 0 32px 0;
text-align: center;
color: #727585;
font-weight: normal;
`

const Wishlogo = styled.img`
height: 30px;
width: 30px;
font-size: 2rem;
color: #fff;
fill: #fff;
cursor: pointer;
margin-right: 10px;
`

const Wishtitle = styled.span`
display: inline-block;
color: #fff;
font-size: 1.5rem;
font-weight: 400;
letter-spacing: 0.02em;
line-height: 125%;
padding: 0;
`