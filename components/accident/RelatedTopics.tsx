import Link from "next/link";

type RelatedTopic = {
  title: string;
  href: string;
};

type Props = {
  topics: RelatedTopic[];
};

export default function RelatedTopics({ topics }: Props) {
  return (
    <section className="mb-8">
      <h2 className="text-2xl font-bold text-black mb-4">Related Topics</h2>
      <div className="flex flex-wrap gap-3 md:gap-4">
        {topics.map((topic) => (
          <Link
            key={topic.href}
            href={topic.href}
            className="inline-flex items-center px-4 py-2 sm:px-5 sm:py-3 rounded-lg bg-gradient-to-r from-[#D52128] to-[#b81b22] text-white text-sm sm:text-base font-medium hover:from-[#b81b22] hover:to-[#9e161c] transition-all duration-300 ease-in-out transform hover:scale-105 shadow-md hover:shadow-lg touch-manipulation"
          >
            {topic.title}
          </Link>
        ))}
      </div>
    </section>
  );
}
