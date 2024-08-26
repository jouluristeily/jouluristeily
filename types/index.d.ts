type Event = {
  title: string;
  description: string;
  startTime: string;
  endTime: string;
  location: string;
};

type Article = {
  id: string;
  title: string;
  content: Content;
  createdAt: string;
  updatedAt: string;
  content_html: string;
};

interface docs {
  Articles: Article[];
}
