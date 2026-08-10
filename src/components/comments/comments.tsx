import { getDict } from "~/dict";
import { getPostThread } from "~/lib/supabase";
import { Lang } from "~/types";
import CommentThread from "./comment-thread";

/** Fikrlar bloki. Supabase yiqilsa ham maqola render bo'ladi. */
export default async function Comments({ lang, slug }: { lang: Lang; slug: string }) {
	const { ui } = await getDict(lang);
	const { comments, failed } = await getPostThread(slug, lang);

	return (
		<section className="mt-16">
			<h2 className="font-display text-2xl font-bold">{ui.commentsTitle}</h2>
			<p className="mt-1 text-xs text-soft">{ui.commentsLangNote}</p>
			<CommentThread
				slug={slug}
				lang={lang}
				initial={comments}
				failed={failed}
				t={{
					empty: ui.commentsEmpty,
					namePlaceholder: ui.namePlaceholder,
					bodyPlaceholder: ui.bodyPlaceholder,
					submit: ui.submit,
					sending: ui.sending,
					errorGeneric: ui.errorGeneric,
					errorRateLimit: ui.errorRateLimit,
					errorDuplicate: ui.errorDuplicate,
				}}
			/>
		</section>
	);
}
