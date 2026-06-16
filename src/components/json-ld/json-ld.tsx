/**
 * JSON-LD strukturali ma'lumotни <script type="application/ld+json"> sifatida
 * render qiladi. `data` bitta obyekt yoki obyektlar massivi bo'lishi mumkin.
 */
export default function JsonLd({ data }: { data: object | object[] }) {
	const items = Array.isArray(data) ? data : [data];
	return (
		<>
			{items.map((item, i) => (
				<script
					key={i}
					type="application/ld+json"
					dangerouslySetInnerHTML={{ __html: JSON.stringify(item) }}
				/>
			))}
		</>
	);
}
