import DownloadStory from "./story/download";
import { BaseStory } from './story/base';

const book = {
  download: new DownloadStory(),
}

class StoryTeller {
  book = null;

  constructor(book) {
    this.book = book
  }

  tell(rawArgv: Array<string>): BaseStory {
    const argvParams = rawArgv.slice(2)

    const storyName = argvParams[0]
    if (!this.book[storyName]) {
      return null
    }
    return this.book[storyName]
  }
}

export default {
  storyTeller: new StoryTeller(book),
}