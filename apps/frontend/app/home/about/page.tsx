'use client';

const AboutPage = () => {
	return (
		<section className='flex flex-col gap-2 w-full'>
			<div
				className='bg-cover h-60 w-full bg-center rounded mb-3'
				style={{
					backgroundImage:
						'url(https://oss.kinda.info/image/202401190030996.jpg)',
				}}></div>
			<h1 className='font-bold text-2xl'>Electron-NextJS快速开发模版</h1>
			<p>
				框架协议：
				<span
					className='cursor-pointer font-bold'
					onClick={() => {
						window.systemApi.openUrl(
							'https://github.com/Alndaly/electron-template?tab=License-1-ov-file'
						);
					}}>
					MIT
				</span>
			</p>
			<p>
				开发者：
				<span
					className='cursor-pointer font-bold'
					onClick={() => {
						window.systemApi.openUrl('https://github.com/Alndaly');
					}}>
					Kinda Hall
				</span>
			</p>
		</section>
	);
};

export default AboutPage;
