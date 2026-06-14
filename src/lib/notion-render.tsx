import { Fragment, ReactNode } from "react";

function renderRich(rt: any[]): ReactNode {
	return (rt ?? []).map((t, i) => {
		const a = t.annotations ?? {};
		let node: ReactNode = t.plain_text;
		if (a.code) node = <code key={`c${i}`}>{node}</code>;
		if (a.bold) node = <strong key={`b${i}`}>{node}</strong>;
		if (a.italic) node = <em key={`i${i}`}>{node}</em>;
		if (t.href) node = <a key={`a${i}`} href={t.href} target="_blank" rel="noopener">{node}</a>;
		return <Fragment key={i}>{node}</Fragment>;
	});
}

export function renderBlocks(blocks: any[]): ReactNode {
	const out: ReactNode[] = [];
	let i = 0;
	while (i < blocks.length) {
		const b = blocks[i];
		const type = b.type;

		if (type === "bulleted_list_item" || type === "numbered_list_item") {
			const ordered = type === "numbered_list_item";
			const items: ReactNode[] = [];
			while (i < blocks.length && blocks[i].type === type) {
				items.push(<li key={blocks[i].id}>{renderRich(blocks[i][type].rich_text)}</li>);
				i++;
			}
			out.push(ordered ? <ol key={b.id}>{items}</ol> : <ul key={b.id}>{items}</ul>);
			continue;
		}

		switch (type) {
			case "heading_2":
				out.push(<h2 key={b.id}>{renderRich(b.heading_2.rich_text)}</h2>);
				break;
			case "heading_3":
				out.push(<h3 key={b.id}>{renderRich(b.heading_3.rich_text)}</h3>);
				break;
			case "paragraph":
				out.push(<p key={b.id}>{renderRich(b.paragraph.rich_text)}</p>);
				break;
			case "code":
				out.push(
					<pre key={b.id}>
						<code>{(b.code.rich_text ?? []).map((t: any) => t.plain_text).join("")}</code>
					</pre>
				);
				break;
			case "quote":
				out.push(<blockquote key={b.id}>{renderRich(b.quote.rich_text)}</blockquote>);
				break;
			case "divider":
				out.push(<hr key={b.id} />);
				break;
			default:
				break;
		}
		i++;
	}
	return out;
}
