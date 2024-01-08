export function Box(props: { children: React.ReactNode; [key: string]: any }) {
	return <div {...props}>{props.children}</div>;
}
