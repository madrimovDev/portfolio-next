import { Lang } from "~/types";

/**
 * Anonim komentatorlar uchun taxalluslar.
 *
 * Ism `(ip_hash, slug)` dan deterministik hisoblanadi — hech qayerda
 * saqlanmaydi. Bir odam bitta maqola ostida doim o'sha ismni oladi
 * (muhokama izchil o'qiladi), boshqa maqolada esa boshqa ism —
 * ya'ni uni maqolalar bo'ylab kuzatib bo'lmaydi.
 *
 * DIQQAT: uchala til ro'yxati BIR XIL uzunlikda bo'lishi shart. Indeks
 * tillar orasida umumiy, shu bilan bir odam har tilda "o'sha shaxs"ning
 * tarjimasi bo'lib chiqadi. Bitta tilga so'z qo'shilsa bu buziladi.
 */

const ADJ: Record<Lang, string[]> = {
	uz: [
		"Sokin", "Sirli", "Tungi", "O'ychan", "Tezkor", "Dono",
		"Yashirin", "Sabrli", "Jimgina", "Erkin", "Ziyrak", "Xotirjam",
	],
	// Ruscha sifatlar erkak jinsida — pastdagi otlarning HAMMASI erkak jinsida
	ru: [
		"Тихий", "Загадочный", "Ночной", "Задумчивый", "Быстрый", "Мудрый",
		"Скрытый", "Терпеливый", "Молчаливый", "Свободный", "Зоркий", "Спокойный",
	],
	en: [
		"Quiet", "Mysterious", "Nocturnal", "Thoughtful", "Swift", "Wise",
		"Hidden", "Patient", "Silent", "Free", "Keen", "Calm",
	],
};

const NOUN: Record<Lang, string[]> = {
	uz: [
		"Qalamkash", "Muhandis", "Kitobxon", "Sayyoh", "Kuzatuvchi", "Izlovchi",
		"Ustoz", "Kashfiyotchi", "Mehmon", "Yo'lovchi", "Hikoyachi", "Me'mor",
		"Kursor", "Kompilyator", "Massiv", "Indeks", "Bayt", "Demon",
		"Kesh", "Daraxt", "Tugun", "Oqim", "Ko'rsatkich", "Bufer",
	],
	// HAMMASI erkak jinsida — rus tilida sifat ot jinsiga moslashadi va
	// aralash ro'yxat "Тихий Миграция" kabi g'alizlik berardi.
	ru: [
		"Писатель", "Инженер", "Читатель", "Странник", "Наблюдатель", "Искатель",
		"Наставник", "Первооткрыватель", "Гость", "Путник", "Рассказчик", "Архитектор",
		"Курсор", "Компилятор", "Массив", "Индекс", "Байт", "Демон",
		"Кеш", "Узел", "Поток", "Указатель", "Итератор", "Буфер",
	],
	en: [
		"Writer", "Engineer", "Reader", "Wanderer", "Observer", "Seeker",
		"Mentor", "Explorer", "Guest", "Traveler", "Storyteller", "Architect",
		"Cursor", "Compiler", "Array", "Index", "Byte", "Daemon",
		"Cache", "Node", "Stream", "Pointer", "Iterator", "Buffer",
	],
};

// Ro'yxatlar sinxronligini modul yuklanganda tekshiramiz — unit test yo'q,
// va nomutanosiblik jimgina "boshqa til = boshqa shaxs" xatosiga olib kelardi.
const LANGS: Lang[] = ["uz", "ru", "en"];
if (
	new Set(LANGS.map((l) => ADJ[l].length)).size > 1 ||
	new Set(LANGS.map((l) => NOUN[l].length)).size > 1
) {
	console.warn(
		"[alias] til ro'yxatlari uzunligi mos emas — taxalluslar tillar orasida siljiydi. " +
			`ADJ: ${LANGS.map((l) => `${l}=${ADJ[l].length}`).join(", ")} | ` +
			`NOUN: ${LANGS.map((l) => `${l}=${NOUN[l].length}`).join(", ")}`
	);
}

/**
 * FNV-1a, urug' sifatida ip_hash ning dastlabki 8 hex belgisi.
 * ip_hash kutilmagan formatda bo'lsa urug' 0 ga tushadi — xato tashlanmaydi.
 */
function mix(ipHash: string, slug: string): number {
	let h = (parseInt(ipHash.slice(0, 8), 16) || 0) >>> 0;
	for (let i = 0; i < slug.length; i++) {
		h ^= slug.charCodeAt(i);
		h = Math.imul(h, 16777619) >>> 0;
	}
	return h;
}

/** Masalan: "Sokin Kursor". Til faqat renderga ta'sir qiladi, indeksga emas. */
export function aliasFor(ipHash: string, slug: string, lang: Lang): string {
	const adj = ADJ[lang];
	const noun = NOUN[lang];
	const h = mix(ipHash, slug);
	return `${adj[h % adj.length]} ${noun[Math.floor(h / adj.length) % noun.length]}`;
}
