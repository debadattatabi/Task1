
$(document).ready(function(){
  $("#search_items2").keypress(function(){
    $("#columns").hide();
    $('.search-content-wrapper').css('display','block');
     $("#append").append(" <b>Appended text</b>.");
  });
});
$("#search_items2").keyup(function() {

    if (!this.value) {
        //alert('The box is empty');
    $("#columns").show();
    $('.search-content-wrapper').hide();
    }

});

'use strict';
/* global instantsearch */

var search = instantsearch({
  appId: 'F9M3Q49OUK',
  apiKey: 'e50081a3931d2676fd8e7f5816451eed',
  indexName: 'test_checkUAE',
  urlSync: true
});

search.addWidget(
  instantsearch.widgets.searchBox({
    container: '#search_items2',
    placeholder: 'Search a product',
	autofocus: false,
	wrapInput : true

  })
);

search.addWidget(
  instantsearch.widgets.stats({
    container: '#stats'
  })
);

search.on('render', function() {
  $('.product-picture img').addClass('transparent');
  $('.product-picture img').one('load', function() {
      $(this).removeClass('transparent');
  }).each(function() {
      if(this.complete) $(this).load();
  });
});

var hitTemplate = 

"<li class='col-xs-4 col-sm-3 col-md-2'><div class='product-container'><div class='left-block'><div class='price-percent-reduction-container''><span class='price-percent-reduction2' style='z-index:1'>{{offer_div}}</span></div>"+


'<a href="https://uae.souqplace.com/products/{{sku}}/{{seourl}}/{{seller_product_id}}"><img class="img-responsive lazy" alt="product" data-original="/assets_new/images/logo.png" src="{{image}}"></a><div class="quick-view"><a title="Add to my wishlist" class="heart" href="#" data-mywhichlist="" data-id="{{sku}}/{{seourl}}/{{seller_product_id}}" data-type="Fresh" style=""></a><a title="Quick view" class="search" href="#" data-id="{{sku}}/{{seourl}}/{{seller_product_id}}"></a></div><div class="add-to-cart"><a title="Add to Cart" href="#" class="search" data-id="{{sku}}/{{seourl}}/{{seller_product_id}}">Add to Cart</a></div></div><div class="right-block"><h5 class="product-name"><a href="https://uae.souqplace.com/products/{{sku}}/{{seourl}}/{{seller_product_id}}" style="">{{product_name}}</a></h5><div class="content_price"><p class="price product-price">{{sale_price}} AED</p><p class="price old-price" style="text-decoration: none"><strike>{{old_price}}</strike> &nbsp;</p></div><div class="info-orther"><p>Item Code: {{sku}}</p><p class="availability">Availability: <span>In Stock</span></p><div class="product-desc" style="text-align:justify">{{product_name}}</div></div></div></div></div></li>';

var noResultsTemplate =
  '<div class="alert alert-warning"><span style="font-size: 19px;color: #cc1b20;margin: 0 0 20px 0;">No Results Found for {{query}} </span><br></b><br><h4><strong>Search Tips:</strong></h4><br><ul><li><span class="glyphicon glyphicon-play" style="font-size:0.8em;"></span>&nbsp;Narrow your search keywords by removing additional keywords.</li><li><span class="glyphicon glyphicon-play" style="font-size:0.8em;"></span>&nbsp;Use full name of the product instead of acronyms.</li><li><span class="glyphicon glyphicon-play" style="font-size:0.8em;"></span>&nbsp;Browse through our catalog or filter the catalog results.</li></ul></div>';

var menuTemplate =
  '<a href="javascript:void(0);" class="facet-item {{#isRefined}}active{{/isRefined}}"><span class="facet-name"><i class="fa fa-angle-right"></i> {{product_name}}</span class="facet-name"></a>';

var facetTemplateCheckbox =
  '<a href="javascript:void(0);" class="facet-item">' +
    '<input type="checkbox" class="{{cssClasses.checkbox}}" value="{{name}}" {{#isRefined}}checked{{/isRefined}} />{{name}}' +
    '<span class="facet-count">({{count}})</span>' +
  '</a>';

var facetTemplateColors =
  '<a href="javascript:void(0);" data-facet-value="{{product_name}}" class="facet-color {{#isRefined}}checked{{/isRefined}}"></a>';

search.addWidget(
  instantsearch.widgets.hits({
    container: '#hits',
    hitsPerPage: 30,
    templates: {
      empty: noResultsTemplate,
      item: hitTemplate
    },
    transformData: function(hit) {
      hit.stars = [];
      for (var i = 1; i <= 5; ++i) {
        hit.stars.push(i <= hit.rating);
      }
      return hit;
    }
  })
);


/*search.addWidget(
  instantsearch.widgets.toggle({
    container: '#free-shipping',
    attributeName: 'type',
    label: 'Free Shipping',
    values: {
      on: true
    },
    templates: {
      header: 'Shipping'
    }
  })
);*/

search.addWidget(
  instantsearch.widgets.pagination({
    container: '#pagination',
    cssClasses: {
      active: 'active'
    },
    // labels: {
      // previous: '<i class="fa fa-angle-left fa-2x"></i> Previous page',
      // next: 'Next page <i class="fa fa-angle-right fa-2x">Next Page</i>'
    // },
    showFirstLast: false
  })
);

// search.addWidget(
  // instantsearch.widgets.menu({
    // container: '#categories',
    // attributeName: 'maincategory',
    // limit: 6,
    // templates: {
      // header: '<div class="facet-title"><strong>CATEGORY</strong><br><br></div class="facet-title">'
    // }
  // })
// );


// search.addWidget(
  // instantsearch.widgets.refinementList({
    // container: '#materials',
    // attributeName: 'brand',
    // operator: 'or',
    // limit: 10,
    // templates: {
      // item: facetTemplateCheckbox,
      // header: '<div class="facet-title">Brands</div class="facet-title">'
    // }
  // })
// );


/*search.addWidget(
  instantsearch.widgets.refinementList({
    container: '#types',
    attributeName: 'type',
    operator: 'or',
    limit: 10,
    templates: {
      item: facetTemplateCheckbox,
      header: '<div class="layered_subtitle">Types</div>'
    }
  })
);*/


search.addWidget(
  instantsearch.widgets.refinementList({
    container: '#sellers',
    attributeName: 'seller',
    operator: 'or',
    limit: 10,
    templates: {
      item: facetTemplateCheckbox,
      header: '<div class="layered_subtitle">SELLER</div>'
    }
  })
);


search.addWidget(
  instantsearch.widgets.numericRefinementList({
    container: '#popularity',
    attributeName: 'price',
    options: [
      {name: 'All'},
      {end: 500, name: 'less than 500'},
      {start: 500, end: 2000, name: 'between 500 and 2000'},
      {start: 2000, name: 'more than 2000'}
    ],
    templates: {
      header: '<div class="layered_subtitle">POPULARITY</div>'
    }
  })
);
search.addWidget(
    instantsearch.widgets.refinementList({
      container: '#brand',
      attributeName: 'brand',
      sortBy: ['id', 'name:asc'],
      limit: 10,
      operator: 'or',
      templates: {
         header: '<div class="layered_subtitle">BRANDS</div>'
      },
      searchForFacetValues: {
        placeholder: 'Search for brands',
        templates: {
          noResults: '<div class="sffv_no-results">No matching brands.</div>'
        }
      }
    })
  );


/*search.addWidget(
  instantsearch.widgets.refinementList({
    container: '#colors',
    attributeName: 'colors',
    operator: 'or',
    limit: 10,
    templates: {
      item: facetTemplateColors,
      header: '<div class="layered_subtitle">COLOURS</div>'
    }
  })
);*/

search.addWidget(
  instantsearch.widgets.hierarchicalMenu({
    container: '#hierarchical-categories',
    attributes: ['maincategory.lvl0','maincategory.lvl1','maincategory.lvl2'],
    templates: {
      header: '<div class="layered_subtitle">CATEGORY</div>'
    }
  })
);


search.addWidget(
  instantsearch.widgets.rangeSlider({
    container: '#price',
    attributeName: 'price',
    templates: {
     header: '<div class="layered_subtitle">PRICE</div>'
    }
  })
);


search.addWidget(
  instantsearch.widgets.refinementList({
    container: '#type',
    attributeName: 'type2',
    limit: 10,
    sortBy: ['isRefined', 'count:desc', 'name:asc'],
    templates: {
      header: '<div class="layered_subtitle">TYPE</div>'
    }
  })
);


search.addWidget(
  instantsearch.widgets.sortBySelector({
    container: '#sort-by-selector',
    indices: [
	 {name: 'test_checkUAE', label: 'Featured'},
      {name: 'uae_asc', label: 'Price asc.'},
      {name: 'uae_desc', label: 'Price desc.'}
    ],
    label:'sort by'
  })
);

search.addWidget(

  instantsearch.widgets.clearAll({
    container: '#clear-all',
    templates: {
      link: '<i class="fa fa-eraser"></i> Clear all filters'
    },
    cssClasses: {
      root: 'btn btn-block btn-default'
    },
    autoHideContainer: true
  })
 
);

search.start();
