export function FakeComponents({ children }: { children: React.ReactNode }) {
	return (
		<>
			<div className="hidden" id="__nuxt">
				<style id="__FRSH_TWIND"></style>
				<meta content="Lume vX.X.X" name="generator" />
			</div>
			{children}
		</>
	);
}
