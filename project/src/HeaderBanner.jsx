import headerBg from './assets/image_3a7561.jpg'; 

function HeaderBanner(props) {
	return(
	<header className="header-banner" style={{ backgroundImage: `url(${headerBg})` }}>
				<div className="header-overlay">
					<h1 className="header-title">{props.headertitle}</h1>
				</div>
			</header>
	);
}
export default HeaderBanner;