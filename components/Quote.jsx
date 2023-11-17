import { RichText } from "@graphcms/rich-text-react-renderer";

export default function Quote({ state }) {
  return (
    <>
      <section className="text-gray-600 body-font">
        <div className="container px-5 py-2 mx-auto">
          <div className="flex flex-col w-full mb-2">
            <blockquote class="p-4 my-4 border-s-4 border-gray-300 bg-gray-50 dark:border-gray-500 dark:bg-gray-800">
              <p class="text-xl italic font-medium leading-relaxed text-gray-900 dark:text-white">
                <RichText content={state.quote.raw.children} />
              </p>
              <span class="inline-block mt-4 text-sm font-medium text-gray-900 dark:text-white title-font">
                - {state.author}
              </span>
            </blockquote>
          </div>
        </div>
      </section>
    </>
  );
}
