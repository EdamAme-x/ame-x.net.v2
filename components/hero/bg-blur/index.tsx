export const BackGroundBlur: React.FC = () => {
	return (
		<div className="h-0 w-0 pointer-events-none before:pointer-events-none after:pointer-events-none before:fixed before:h-[300px] before:w-[480px] before:-translate-x-1/2 before:rounded-full before:bg-gradient-radial before:blur-2xl before:content-[''] after:fixed after:-z-20 after:h-[180px] after:w-[240px] after:translate-x-1/3 after:bg-gradient-conic after:blur-2xl after:content-[''] before:bg-gradient-to-br before:from-transparent before:to-blue-700 before:opacity-[0.2] after:from-sky-900 after:via-[#0141ff] after:opacity-[0.2] before:lg:h-[360px] z-[-1]"></div>
	);
};
