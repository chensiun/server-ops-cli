import DownloadStory from "./story/download";
import BuilderStory from "./story/builder";
import HelpStory from "./story/help";
import { BaseStory } from './story/base';

const book = {
  download: new DownloadStory(),
  builder: new BuilderStory(),
  help: new HelpStory(),
}

class StoryTeller {
  book = null;

  constructor(book) {
    this.book = book
  }

  tell(rawArgv: Array<string>): BaseStory {
    const argvParams = rawArgv.slice(2)

    let storyName = argvParams[0]
    if (!this.book[storyName]) {
      storyName = 'help'
    }
    const activeStory = this.book[storyName];

    activeStory.readMenu(this.book);
    return activeStory;
  }
}

export default {
  storyTeller: new StoryTeller(book),
}
