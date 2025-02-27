import { PCCConvenienceFunctions } from "@pantheon-systems/pcc-react-sdk";
import type { Article, ArticleWithoutContent } from "@pantheon-systems/pcc-react-sdk";
import { getArticleURLFromSite } from "@pantheon-systems/pcc-react-sdk/server";
import Link from "next/link";

// Interface to match the structure defined in smart component map
interface DocumentIdItem {
  item: string;
}

interface Props {
  documentIds: DocumentIdItem[];
}

const TileNavigation = async ({ documentIds }: Props) => {
  // Extract document IDs from the object structure
  const docIds = documentIds?.map(doc => doc.item) || [];
  
  // Validate documentIds (min 2, max 5)
  const validDocIds = docIds.slice(0, 5);
  if (validDocIds.length < 2) {
    return (
      <div className="text-red-600">
        Error: TileNavigation requires at least 2 document IDs
      </div>
    );
  }

  // Fetch articles using Document IDs in parallel
  const articles = await Promise.all(validDocIds.map(async (docId) => {
    try {
      return await PCCConvenienceFunctions.getArticleBySlugOrId(docId);
    } catch (error) {
      console.error(`Error fetching article with ID ${docId}:`, error);
      return null;
    }
  }));

  // Filter out any null articles (failed fetches)
  const validArticles = articles.filter(Boolean);

  if (!validArticles || validArticles.length === 0) {
    return <div className="p-4">No articles found for the provided document IDs.</div>;
  }

  // Get the site for URL generation
  let site;
  try {
    site = await PCCConvenienceFunctions.getSite();
  } catch (error) {
    console.error("Error fetching site:", error);
    return <div className="p-4 text-red-600">Error loading site information.</div>;
  }

  return (
    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3">
      {validArticles.map((article: Article | null) => (
        <NavigationTile 
          key={article?.id} 
          article={article as ArticleWithoutContent}
        />
      ))}
    </div>
  );
};

interface NavigationTileProps {
  article: ArticleWithoutContent;
}

function NavigationTile({ article }: NavigationTileProps) {
  // Use the article slug to construct a simple URL
  const targetHref = `/articles/${article.slug}`;
  const imageSrc = (article.metadata?.["image"] as string) || null;

  return (
    <div className="group flex h-full flex-col overflow-clip rounded-xl shadow-lg ring-1 ring-gray-300/50">
      <div className="aspect-video w-full flex-shrink-0 overflow-hidden sm:h-[196px]">
        <TileCoverImage
          imageSrc={imageSrc}
          imageAltText={`Cover image for ${article.title}`}
        />
      </div>
      <div className="flex flex-grow flex-col justify-between p-8">
        <div>
          <h1 className="mb-3 text-xl font-semibold leading-7">
            {article.title}
          </h1>
          {article.metadata?.["Description"] ? (
            <p className="line-clamp-3 min-h-[4.5rem] text-gray-600">
              {article.metadata?.["Description"]?.toString() || ""}
            </p>
          ) : null}
        </div>
        <Link href={targetHref} className="mt-8 text-blue-600 hover:text-blue-800 font-medium">
          Read more →
        </Link>
      </div>
    </div>
  );
}

function TileCoverImage({
  imageSrc,
  imageAltText,
}: {
  imageSrc: string | null | undefined;
  imageAltText?: string | undefined;
}) {
  return imageSrc != null ? (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={imageSrc}
      alt={imageAltText}
      className="h-full w-full object-cover"
    />
  ) : (
    <div className="h-full w-full bg-gradient-to-t from-neutral-800 to-neutral-100" />
  );
}

export default TileNavigation;