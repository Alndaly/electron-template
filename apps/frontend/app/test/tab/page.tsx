'use client';

import { useEffect, useState } from 'react';

const TabPage = () => {
	const [query, setQuery] = useState<any>([]);
	const onGetViewQuery = async () => {
		const query = await window.electronApi.windowManager.getViewQuery();
		setQuery(query);
	};
	useEffect(() => {
		onGetViewQuery();
	}, []);
	return (
		<div className='w-full h-full flex justify-center items-center flex flex-col'>
			<p>这是一个tab级别的测试页面</p>
		</div>
	);
};

export default TabPage;
