"use client"

import { useRouter } from 'next/navigation';

const SideBar = () => {
	const route = useRouter();
	const menus = [
		{
			label: '首页',
			href: '/home/',
		},
		{
			label: '关于',
			href: '/home/about',
		},
	];
	return (
		<div className='min-w-60 h-full flex flex-col overflow-auto items-center'>
			<h1 className='font-bold text-6xl p-5 flex justify-center items-center'>
				ETN
			</h1>
			<div className='p-5 flex flex-col flex-1 overflow-auto gap-3 w-full'>
				{menus.map((menu, index) => {
					return (
						<div
							key={index}
							onClick={() => route.push(menu.href)}
							className='w-full p-3 rounded cursor-pointer bg-black/10 dark:bg-white/10 flex justify-center items-center'>
							{menu.label}
						</div>
					);
				})}
			</div>
		</div>
	);
};

export default SideBar;
