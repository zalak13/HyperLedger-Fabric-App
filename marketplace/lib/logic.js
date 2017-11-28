/**
 * Buyer transaction processor function.
 * @param {org.zalak.marketplace.buyArticle} tx The buy article transaction instance.
 * @transaction
 */

 function buyingArticle(tx) {
  	//tx.article.seller.points = tx.article.seller.points + 10;
    //tx.buyer.reputation = tx.buyer.reputation + 100;

  	if(tx.article.saleStatus == false){
      // Emit an event for the modified asset.
      var event = getFactory().newEvent('org.zalak.marketplace', 'errorEventNotification');
      event.eventName = tx.article.articleId+" cannot be bought, it is sold."
      emit(event);
      return null
    }else{
      // Get the asset registry for the asset.
      return getAssetRegistry('org.zalak.marketplace.Article')
          .then(function (assetRegistry) {

              // Update the asset in the asset registry.
              return assetRegistry.update(tx.article);

          })
          .then(function () {
              return getParticipantRegistry('org.zalak.marketplace.User');
          })
          .then(function (participantRegistry) {

              // Update the asset in the asset registry.
              return participantRegistry.update(tx.buyer);
          })
          .then(function () {

              // Emit an event for the modified asset.
              var event = getFactory().newEvent('org.zalak.marketplace', 'buyArticleEventNotification');
              event.eventName = tx.buyer.firstName+" bought the article: "+tx.article.articleId
              event.article = tx.article;
              event.seller = tx.article.seller;
              event.buyer = tx.buyer;
              emit(event);
          });
    }
}

/**
 * Seller transaction processor function.
 * @param {org.zalak.marketplace.sellArticle} tx The article sale transaction instance.
 * @transaction
 */
function saleOfArticle(tx) {
  	//tx.article.seller.reputation = tx.article.seller.reputation + 100;
    tx.article.saleStatus = true;

  	if(tx.article.seller.userId != tx.seller.userId){
      // Emit an event for the modified asset.
      var event = getFactory().newEvent('org.zalak.marketplace', 'errorEventNotification');
      event.eventName = tx.article.articleId+" can only be sold by the seller: "+tx.seller.userId
      emit(event);
      return null
    }else{
      // Get the asset registry for the asset.
      return getAssetRegistry('org.zalak.marketplace.Article')
          .then(function (assetRegistry) {

              // Update the asset in the asset registry.
              return assetRegistry.update(tx.article);

          })
          .then(function () {
              return getParticipantRegistry('org.zalak.marketplace.User');
          })
          .then(function (participantRegistry) {

              // Update the asset in the asset registry.
              return participantRegistry.update(tx.article.seller);
          })
          .then(function () {

              // Emit an event for the modified asset.
              var event = getFactory().newEvent('org.zalak.marketplace', 'sellArticleEventNotification');
              event.eventName = tx.seller.firstName+" sold article: "+tx.article.articleId
              event.article = tx.article;
              event.seller = tx.article.seller;
              emit(event);
          });
    }
}
