import {Asset} from './org.hyperledger.composer.system';
import {Participant} from './org.hyperledger.composer.system';
import {Transaction} from './org.hyperledger.composer.system';
import {Event} from './org.hyperledger.composer.system';
// export namespace org.zalak.marketplace{
   export class Article extends Asset {
      articleId: string;
      description: string;
      price: number;
      saleStatus: boolean;
      seller: User;
   }
   export class User extends Participant {
      userId: string;
      firstName: string;
      lastName: string;
   }
   export class sellArticle extends Transaction {
      article: Article;
      seller: User;
   }
   export class buyArticle extends Transaction {
      article: Article;
      buyer: User;
   }
   export class sellArticleEventNotification extends Event {
      eventName: string;
      article: Article;
      seller: User;
   }
   export class buyArticleEventNotification extends Event {
      eventName: string;
      article: Article;
      seller: User;
      buyer: User;
   }
   export class errorEventNotification extends Event {
      eventName: string;
   }
// }
