import { useState } from "react";
import Link from "next/link";
import styled from "styled-components";
import { useDispatch } from "react-redux";
import { logoutAPI } from "../lib/api/auth";
import { userActions } from "../store/user";
import HamburgerIcon from "../public/static/svg/header/hamburger.svg";
import OutsideClickHandler from "react-outside-click-handler";
import { useSelector } from "../store";
import palette from "../styles/palette";

const Container = styled.div`
	.header-user-profile {
		display: flex;
		align-items: center;
		height: 42px;
		padding: 0 6px 0 16px;
		border: 0;
		box-shadow: 0px 1px 2px rgba(0, 0, 0, 0.18);
		border-radius: 21px;
		background-color: white;
		cursor: pointer;
		outline: none;
		&:hover {
			box-shadow: 0px 2px 8px rgba(0, 0, 0, 0.12);
		}
		.header-user-profile-image {
			margin-left: 8px;
			width: 30px;
			height: 30px;
			border-radius: 50%;
		}
	}

	.header-logo-wrapper + div {
		position: relative;
	}

	.header-usermenu {
		position: absolute;
		right: 30px;
		top: 82px;
		width: 240px;
		padding: 8px 0;
		box-shadow: 0 2px 16px rgba(0, 0, 0, 0.12);
		border-radius: 8px;
		background-color: white;
		li {
			display: flex;
			align-items: center;
			width: 100%;
			height: 42px;
			padding: 0 16px;
			cursor: pointer;
			&:hover {
				background-color: ${palette.gray_f7};
			}
		}
		.header-usermenu-divider {
			width: 100%;
			height: 1px;
			margin: 8px 0;
			background-color: ${palette.gray_dd};
		}
	}
`;

const HeaderUserProfile: React.FC = () => {
	const [isUserMenuOpened, setIsUserMenuOpened] = useState(false);
	const userProfileImage = useSelector((state) => state.user.profileImage);

	const dispatch = useDispatch();

	const logout = async () => {
		try {
			await logoutAPI();
			dispatch(userActions.initUser());
		} catch (e) {
			console.log(e);
		}
	};
	return (
		<Container>
			<OutsideClickHandler onOutsideClick={() => {if (isUserMenuOpened) setIsUserMenuOpened(false);}}>
				<button type="button" className="header-user-profile" onClick={() => setIsUserMenuOpened(!isUserMenuOpened)} >
					<HamburgerIcon />
					<img src={userProfileImage} className="header-user-profile-image" alt="" />
				</button>
				{isUserMenuOpened && (
					<ul className="header-usermenu">
						<li>숙소 관리</li>
						<Link href="/room/register/building">
							<a role="presentation" onClick={() => setIsUserMenuOpened(false)}>
								<li>숙소 등록하기</li>
							</a>
						</Link>
						<div className="header-usermenu-divider" />
						<li role="presentation" onClick={logout}>
							로그아웃
						</li>
					</ul>
				)}
			</OutsideClickHandler>
		</Container>
	);
};

export default HeaderUserProfile;
