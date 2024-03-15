'use client';

import React from 'react';
import { uuid } from '../common/uuid';
import { useViewStore } from '@/store/view';

export default function Page(): JSX.Element {
	const { addView } = useViewStore();
	const tabs = [
		{
			title: '测试 Tab 1',
			path: '/test/tab',
		},
	];
	return (
		<div className='h-full flex-1 overflow-auto'>
			<section>
				<div
					className='bg-cover h-60 w-full bg-center rounded mb-3'
					style={{
						backgroundImage:
							'url(https://oss.kinda.info/image/202401211555429.jpeg)',
					}}></div>
				<div className='w-full grid grid-cols-4 gap-4'>
					{tabs.map((tab, index) => {
						return (
							<div
								key={index}
								className='rounded border p-3 cursor-pointer'
								onClick={() =>
									addView({
										title: tab.title,
										path: tab.path,
									})
								}>
								新tab1
							</div>
						);
					})}
				</div>
			</section>
		</div>
	);
}
