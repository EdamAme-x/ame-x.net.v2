export function SEO(props: { top_level: string; secondary_level?: string }) {
	return (
		<div className="hidden">
			<h1>{props.top_level}</h1>
			{props.secondary_level ? <h2>{props.secondary_level}</h2> : null}
		</div>
	);
}
