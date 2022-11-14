var script = {
  data() {
    return {
      shopItems: [],
      cartItems: []
    };
  },
  mounted: function () {
    axios
      .get("https://s3-us-west-2.amazonaws.com/s.cdpn.io/1315882/shoes.json")
      .then((res) => {
        this.$data.shopItems = res.data.shoes;
      });
  },
  methods: {
    addToCart(item) {
      if (!item.inCart) {
        item.inCart = true;
        const newItem = Object.assign({}, item, { count: 1 });
        this.$data.cartItems.push(newItem);

        const animationTarget = this.$refs[`addButton${item.id}`];
        gsap.to(animationTarget, {
          width: 46,
          duration: 0.8,
          ease: "power4"
        });
      }
      this.$nextTick(() => {
        this.$refs.cartItems.scrollTop = this.$refs.cartItems.scrollHeight;
      });
    },

    decrement(item) {
      item.count--;
      const targetShopItem = this.$data.shopItems.find(
        (shopItem) => shopItem.id === item.id
      );

      this.$nextTick(function () {
        if (item.count === 0) {
          const animationTarget = this.$refs[`addButton${targetShopItem.id}`];
          gsap.to(animationTarget, {
            width: 136,
            duration: 0.8,
            ease: "power4"
          });
          targetShopItem.inCart = false;
          const targetIndex = this.$data.cartItems.findIndex(
            (cartItem) => cartItem.id === item.id
          );
          this.$data.cartItems.splice(targetIndex, 1);
        }
      });
    },

    increment(item) {
      item.count++;
    }
  }
};

function normalizeComponent(template, style, script, scopeId, isFunctionalTemplate, moduleIdentifier /* server only */, shadowMode, createInjector, createInjectorSSR, createInjectorShadow) {
    if (typeof shadowMode !== 'boolean') {
        createInjectorSSR = createInjector;
        createInjector = shadowMode;
        shadowMode = false;
    }
    
    const options = typeof script === 'function' ? script.options : script;
    
    if (template && template.render) {
        options.render = template.render;
        options.staticRenderFns = template.staticRenderFns;
        options._compiled = true;
       
        if (isFunctionalTemplate) {
            options.functional = true;
        }
    }
    
    if (scopeId) {
        options._scopeId = scopeId;
    }
    let hook;
    if (moduleIdentifier) {
        
        hook = function (context) {
            
            context =
                context || 
                    (this.$vnode && this.$vnode.ssrContext) || 
                    (this.parent && this.parent.$vnode && this.parent.$vnode.ssrContext); 
            
            if (!context && typeof __VUE_SSR_CONTEXT__ !== 'undefined') {
                context = __VUE_SSR_CONTEXT__;
            }
            
            if (style) {
                style.call(this, createInjectorSSR(context));
            }
            
            if (context && context._registeredComponents) {
                context._registeredComponents.add(moduleIdentifier);
            }
        };
        
        options._ssrRegister = hook;
    }
    else if (style) {
        hook = shadowMode
            ? function (context) {
                style.call(this, createInjectorShadow(context, this.$root.$options.shadowRoot));
            }
            : function (context) {
                style.call(this, createInjector(context));
            };
    }
    if (hook) {
        if (options.functional) {
            
            const originalRender = options.render;
            options.render = function renderWithStyleInjection(h, context) {
                hook.call(context);
                return originalRender(h, context);
            };
        }
        else {
            
            const existing = options.beforeCreate;
            options.beforeCreate = existing ? [].concat(existing, hook) : [hook];
        }
    }
    return script;
}

const isOldIE = typeof navigator !== 'undefined' &&
    /msie [6-9]\\b/.test(navigator.userAgent.toLowerCase());
function createInjector(context) {
    return (id, style) => addStyle(id, style);
}
let HEAD;
const styles = {};
function addStyle(id, css) {
    const group = isOldIE ? css.media || 'default' : id;
    const style = styles[group] || (styles[group] = { ids: new Set(), styles: [] });
    if (!style.ids.has(id)) {
        style.ids.add(id);
        let code = css.source;
        if (css.map) {
            
            
            code += '\n/*# sourceURL=' + css.map.sources[0] + ' */';
            
            code +=
                '\n/*# sourceMappingURL=data:application/json;base64,' +
                    btoa(unescape(encodeURIComponent(JSON.stringify(css.map)))) +
                    ' */';
        }
        if (!style.element) {
            style.element = document.createElement('style');
            style.element.type = 'text/css';
            if (css.media)
                style.element.setAttribute('media', css.media);
            if (HEAD === undefined) {
                HEAD = document.head || document.getElementsByTagName('head')[0];
            }
            HEAD.appendChild(style.element);
        }
        if ('styleSheet' in style.element) {
            style.styles.push(code);
            style.element.styleSheet.cssText = style.styles
                .filter(Boolean)
                .join('\n');
        }
        else {
            const index = style.ids.size - 1;
            const textNode = document.createTextNode(code);
            const nodes = style.element.childNodes;
            if (nodes[index])
                style.element.removeChild(nodes[index]);
            if (nodes.length)
                style.element.insertBefore(textNode, nodes[index]);
            else
                style.element.appendChild(textNode);
        }
    }
}


const __vue_script__ = script;

var __vue_render__ = function() {
  var _vm = this;
  var _h = _vm.$createElement;
  var _c = _vm._self._c || _h;
  return _c("div", { staticClass: "wrapper" }, [
    _c("div", { staticClass: "screen -left" }, [
      _vm._m(0),
      _c("div", { staticClass: "title" }, [_vm._v("Itens escolhidos")]),
      _c(
        "div",
        { staticClass: "shop-items" },
        _vm._l(_vm.shopItems, function(item) {
          return _c("div", { staticClass: "item" }, [
            _c("div", { staticClass: "item-block" }, [
              _c(
                "div",
                {
                  staticClass: "image-area",
                  style: { backgroundColor: item.color }
                },
                [
                  _c("img", {
                    staticClass: "image",
                    attrs: { src: item.image }
                  })
                ]
              ),
              _c("div", { staticClass: "name" }, [_vm._v(_vm._s(item.name))]),
              _c("div", { staticClass: "description" }, [
                _vm._v(_vm._s(item.description))
              ]),
              _c("div", { staticClass: "bottom-area" }, [
                _c("div", { staticClass: "price" }, [
                  _vm._v("$" + _vm._s(item.price))
                ]),
                _c(
                  "div",
                  {
                    ref: "addButton" + item.id,
                    refInFor: true,
                    staticClass: "button",
                    class: { "-active": item.inCart },
                    on: {
                      click: function($event) {
                        return _vm.addToCart(item)
                      }
                    }
                  },
                  [
                    _c(
                      "transition",
                      { attrs: { name: "buttonText", mode: "out-in" } },
                      [
                        !item.inCart
                          ? _c("p", [_vm._v("ADICIONAR")])
                          : _c("div", { staticClass: "cover" }, [
                              _c("div", { staticClass: "check" })
                            ])
                      ]
                    )
                  ],
                  1
                )
              ])
            ])
          ])
        }),
        0
      )
    ]),
    _c(
      "div",
      { ref: "cartItems", staticClass: "screen -right" },
      [
        _vm._m(1),
        _c("div", { staticClass: "title" }, [_vm._v("Seu carrinho")]),
        _c("transition", { attrs: { name: "noContent" } }, [
          _vm.$data.cartItems.length === 0
            ? _c("div", { staticClass: "no-content" }, [
                _c("p", { staticClass: "text" }, [
                  _vm._v("Seu carrinho está vazio.")
                ])
              ])
            : _vm._e()
        ]),
        _c(
          "div",
          { staticClass: "cart-items" },
          [
            _c(
              "transition-group",
              { attrs: { name: "cartList", tag: "div" } },
              _vm._l(_vm.$data.cartItems, function(item) {
                return _c("div", { key: item.id, staticClass: "cart-item" }, [
                  _c("div", { staticClass: "left" }, [
                    _c("div", { staticClass: "cart-image" }, [
                      _c("div", { staticClass: "image-wrapper" }, [
                        _c("img", {
                          staticClass: "image",
                          attrs: { src: item.image }
                        })
                      ])
                    ])
                  ]),
                  _c("div", { staticClass: "right" }, [
                    _c("div", { staticClass: "name" }, [
                      _vm._v(_vm._s(item.name))
                    ]),
                    _c("div", { staticClass: "price" }, [
                      _vm._v("$" + _vm._s(item.price))
                    ]),
                    _c("div", { staticClass: "count" }, [
                      _c(
                        "div",
                        {
                          staticClass: "button",
                          on: {
                            click: function($event) {
                              return _vm.decrement(item)
                            }
                          }
                        },
                        [_vm._v("<")]
                      ),
                      _c("div", { staticClass: "number" }, [
                        _vm._v(_vm._s(item.count))
                      ]),
                      _c(
                        "div",
                        {
                          staticClass: "button",
                          on: {
                            click: function($event) {
                              return _vm.increment(item)
                            }
                          }
                        },
                        [_vm._v(">")]
                      )
                    ])
                  ])
                ])
              }),
              0
            )
          ],
          1
        )
      ],
      1
    )
  ])
};
var __vue_staticRenderFns__ = [
  function() {
    var _vm = this;
    var _h = _vm.$createElement;
    var _c = _vm._self._c || _h;
    return _c("div", { staticClass: "app-bar" }, [
      _c("img", {
        staticClass: "logo",
        attrs: {
          src:
            "https://s3-us-west-2.amazonaws.com/s.cdpn.io/1315882/pngwave.png"
        }
      })
    ])
  },
  function() {
    var _vm = this;
    var _h = _vm.$createElement;
    var _c = _vm._self._c || _h;
    return _c("div", { staticClass: "app-bar" }, [
      _c("img", {
        staticClass: "logo",
        attrs: {
          src:
            "https://s3-us-west-2.amazonaws.com/s.cdpn.io/1315882/pngwave.png"
        }
      })
    ])
  }
];
__vue_render__._withStripped = true;

  /* style */
  const __vue_inject_styles__ = function (inject) {
    if (!inject) return
    inject("data-v-187a0bb4_0", { source: "body {\n  font-family: \"Rubik\", sans-serif;\n  color: #303841;\n}\n.wrapper {\n  height: 100vh;\n  display: flex;\n  align-items: center;\n  justify-content: space-between;\n  position: relative;\n  flex-wrap: wrap;\n  padding: 40px 20px;\n  max-width: 720px;\n  margin: 0 auto;\n}\n.wrapper::before {\n  content: \"\";\n  display: block;\n  position: fixed;\n  width: 300%;\n  height: 100%;\n  top: 50%;\n  left: 50%;\n  border-radius: 100%;\n  transform: translateX(-50%) skewY(-8deg);\n  background-color: #f6c90e;\n  z-index: -1;\n  animation: wave 8s ease-in-out infinite alternate;\n}\n@keyframes wave {\n0% {\n    transform: translateX(-50%) skew(0deg, -8deg);\n}\n100% {\n    transform: translateX(-30%) skew(8deg, -4deg);\n}\n}\n.screen {\n  background-color: #fff;\n  box-sizing: border-box;\n  width: 340px;\n  height: 600px;\n  box-shadow: 0 3.2px 2.2px rgba(0, 0, 0, 0.02), 0 7px 5.4px rgba(0, 0, 0, 0.028), 0 12.1px 10.1px rgba(0, 0, 0, 0.035), 0 19.8px 18.1px rgba(0, 0, 0, 0.042), 0 34.7px 33.8px rgba(0, 0, 0, 0.05), 0 81px 81px rgba(0, 0, 0, 0.07);\n  border-radius: 30px;\n  overflow-y: scroll;\n  padding: 0 28px;\n  position: relative;\n  margin-bottom: 20px;\n}\n.screen::before {\n  content: \"\";\n  display: block;\n  position: absolute;\n  width: 300px;\n  height: 300px;\n  border-radius: 100%;\n  background-color: #f6c90e;\n  top: -20%;\n  left: -50%;\n  z-index: 0;\n}\n.screen::-webkit-scrollbar {\n  display: none;\n}\n.screen > .title {\n  font-size: 24px;\n  font-weight: bold;\n  margin: 20px 0;\n  position: relative;\n}\n.app-bar {\n  padding: 12px 0;\n  position: relative;\n}\n.app-bar > .logo {\n  display: block;\n  width: 50px;\n}\n.shop-items {\n  position: relative;\n}\n.item-block {\n  padding: 40px 0 70px;\n}\n.item-block:first-child {\n  padding-top: 0;\n}\n.item-block > .image-area {\n  border-radius: 30px;\n  height: 380px;\n  display: flex;\n  align-items: center;\n  overflow: hidden;\n}\n.item-block > .image-area > .image {\n  display: block;\n  width: 100%;\n  filter: drop-shadow(0 30px 20px rgba(0, 0, 0, 0.2));\n  transform: rotate(-24deg);\n  margin-left: -16px;\n}\n.item-block > .name {\n  font-size: 20px;\n  font-weight: bold;\n  margin: 26px 0 20px;\n  line-height: 1.5;\n}\n.item-block > .description {\n  font-size: 13px;\n  color: #777;\n  line-height: 1.8;\n  margin-bottom: 20px;\n}\n.item-block > .bottom-area {\n  display: flex;\n  justify-content: space-between;\n  align-items: center;\n}\n.item-block > .bottom-area > .price {\n  font-size: 18px;\n  font-weight: bold;\n}\n.item-block > .bottom-area > .button {\n  cursor: pointer;\n  background-color: #f6c90e;\n  font-weight: bold;\n  font-size: 14px;\n  box-sizing: border-box;\n  height: 46px;\n  padding: 16px 20px;\n  border-radius: 100px;\n  box-shadow: 0 3px 6px rgba(0, 0, 0, 0.2);\n  transition: box-shadow 0.4s, background-color 0.2s;\n  user-select: none;\n  white-space: nowrap;\n  position: relative;\n  display: flex;\n  align-items: center;\n  overflow: hidden;\n}\n.item-block > .bottom-area > .button:hover {\n  background-color: #f8d43f;\n  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);\n}\n.item-block > .bottom-area > .button.-active {\n  pointer-events: none;\n  cursor: default;\n}\n.item-block > .bottom-area > .button > .cover {\n  width: 16px;\n  height: 16px;\n  position: absolute;\n  display: flex;\n  justify-content: center;\n  align-items: center;\n}\n.item-block > .bottom-area > .button > .cover > .check {\n  width: 100%;\n  height: 100%;\n  transform: translate(-100%, -73%) rotate(-45deg);\n  position: absolute;\n  left: 50%;\n  top: 50%;\n}\n.item-block > .bottom-area > .button > .cover > .check::before, .item-block > .bottom-area > .button > .cover > .check::after {\n  content: \"\";\n  display: block;\n  background-color: #303841;\n  position: absolute;\n  left: 0;\n  bottom: 0;\n  border-radius: 10px;\n}\n.item-block > .bottom-area > .button > .cover > .check::before {\n  width: 3px;\n  height: 50%;\n}\n.item-block > .bottom-area > .button > .cover > .check::after {\n  width: 100%;\n  height: 3px;\n}\n.cart-items {\n  position: relative;\n}\n.no-content {\n  position: relative;\n}\n.no-content > .text {\n  font-size: 14px;\n}\n.cart-item {\n  display: flex;\n  padding: 20px 0;\n}\n.cart-item > .right > .name {\n  font-size: 14px;\n  font-weight: bold;\n  line-height: 1.5;\n  margin-bottom: 10px;\n}\n.cart-item > .right > .price {\n  font-size: 20px;\n  font-weight: bold;\n  margin-bottom: 16px;\n}\n.cart-item > .right > .count {\n  display: flex;\n  align-items: center;\n}\n.cart-item > .right > .count > .number {\n  font-size: 14px;\n  margin: 0 14px;\n  width: 20px;\n  text-align: center;\n}\n.cart-item > .right > .count .button {\n  cursor: pointer;\n  width: 28px;\n  height: 28px;\n  border-radius: 100%;\n  background-color: #eee;\n  font-size: 16px;\n  font-weight: bold;\n  display: flex;\n  justify-content: center;\n  align-items: center;\n  transition: 0.2s;\n  user-select: none;\n}\n.cart-item > .right > .count .button:hover {\n  background-color: #ddd;\n}\n.cart-image {\n  width: 90px;\n  height: 90px;\n  border-radius: 100%;\n  background-color: #eee;\n  margin-right: 34px;\n}\n.cart-image > .image-wrapper > .image {\n  display: block;\n  width: 140%;\n  transform: rotate(-28deg) translateY(-40px);\n  filter: drop-shadow(0 30px 20px rgba(0, 0, 0, 0.2));\n}\n.buttonText-leave-active,\n.buttonText-enter-active {\n  transition: opacity 0.2s, top 0.35s;\n}\n.buttonText-leave-to,\n.buttonText-enter {\n  opacity: 0;\n}\n.cartList-enter-active {\n  transition: all 2s;\n}\n.cartList-enter-active > .right > .name,\n.cartList-enter-active > .right > .price {\n  transition: 0.4s;\n}\n.cartList-enter-active > .right > .name {\n  transition-delay: 0.7s;\n}\n.cartList-enter-active > .right > .price {\n  transition-delay: 0.85s;\n}\n.cartList-enter-active > .right > .count {\n  transition: opacity 0.4s;\n  transition-delay: 1s;\n}\n.cartList-enter-active .cart-image {\n  transition: 0.5s cubic-bezier(0.79, 0.01, 0.22, 1);\n}\n.cartList-enter-active .cart-image > .image-wrapper {\n  transition: 0.5s cubic-bezier(0.79, 0.01, 0.22, 1) 0.1s;\n}\n.cartList-enter > .right > .name,\n.cartList-enter > .right > .price {\n  opacity: 0;\n  transform: translateX(30px);\n}\n.cartList-enter > .right .count {\n  opacity: 0;\n}\n.cartList-enter .cart-image {\n  transform: scale(0);\n}\n.cartList-enter .cart-image > .image-wrapper {\n  transform: scale(0);\n}\n.cartList-leave-active {\n  transition: 0.7s cubic-bezier(0.79, 0.01, 0.22, 1);\n  position: absolute;\n}\n.cartList-leave-to {\n  transform: scale(0);\n  opacity: 0;\n}\n.cartList-move {\n  transition: 0.7s cubic-bezier(0.79, 0.01, 0.22, 1);\n}\n.noContent-enter-active, .noContent-leave-active {\n  transition: opacity 0.5s;\n  position: absolute;\n}\n.noContent-enter, .noContent-leave-to {\n  opacity: 0;\n}\n\n/*# sourceMappingURL=pen.vue.map */", map: {"version":3,"sources":["/tmp/codepen/vuejs/src/pen.vue","pen.vue"],"names":[],"mappings":"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","file":"pen.vue","sourcesContent":["<template lang=\"pug\">\n.wrapper\n  .screen.-left\n    .app-bar\n     img.logo(src=\"https://s3-us-west-2.amazonaws.com/s.cdpn.io/1315882/pngwave.png\")\n    .title Picked items\n    .shop-items\n      .item(v-for=\"item in shopItems\")\n        .item-block\n          .image-area(:style=\"{backgroundColor: item.color}\")\n            img.image(:src=\"item.image\")\n          .name {{ item.name }}\n          .description {{ item.description }}\n          .bottom-area\n            .price ${{ item.price }}\n            .button(@click=\"addToCart(item)\" :ref=\"'addButton' + item.id\" :class=\"{'-active': item.inCart}\")\n              transition(name=\"buttonText\" mode=\"out-in\")\n                p(v-if=\"!item.inCart\") ADD TO CART\n                .cover(v-else)\n                  .check\n  .screen.-right(ref=\"cartItems\")\n    .app-bar\n     img.logo(src=\"https://s3-us-west-2.amazonaws.com/s.cdpn.io/1315882/pngwave.png\")\n    .title Your cart\n    transition(name=\"noContent\")\n      .no-content(v-if=\"$data.cartItems.length === 0\")\n        p.text Your cart is empty.\n    .cart-items\n      transition-group(name=\"cartList\" tag=\"div\")\n        .cart-item(v-for=\"item in $data.cartItems\" :key=\"item.id\")\n          .left\n            .cart-image\n              .image-wrapper\n                img.image(:src=\"item.image\")\n          .right\n            .name {{item.name}}\n            .price ${{item.price}}\n            .count\n              .button(@click=\"decrement(item)\") <\n              .number {{item.count}}\n              .button(@click=\"increment(item)\") >\n    \n</template>\n\n<script>\nexport default {\n  data() {\n    return {\n      shopItems: [],\n      cartItems: []\n    };\n  },\n  mounted: function () {\n    axios\n      .get(\"https://s3-us-west-2.amazonaws.com/s.cdpn.io/1315882/shoes.json\")\n      .then((res) => {\n        this.$data.shopItems = res.data.shoes;\n      });\n  },\n  methods: {\n    addToCart(item) {\n      if (!item.inCart) {\n        item.inCart = true;\n        const newItem = Object.assign({}, item, { count: 1 });\n        this.$data.cartItems.push(newItem);\n\n        const animationTarget = this.$refs[`addButton${item.id}`];\n        gsap.to(animationTarget, {\n          width: 46,\n          duration: 0.8,\n          ease: \"power4\"\n        });\n      }\n      this.$nextTick(() => {\n        this.$refs.cartItems.scrollTop = this.$refs.cartItems.scrollHeight;\n      });\n    },\n\n    decrement(item) {\n      item.count--;\n      const targetShopItem = this.$data.shopItems.find(\n        (shopItem) => shopItem.id === item.id\n      );\n\n      this.$nextTick(function () {\n        if (item.count === 0) {\n          const animationTarget = this.$refs[`addButton${targetShopItem.id}`];\n          gsap.to(animationTarget, {\n            width: 136,\n            duration: 0.8,\n            ease: \"power4\"\n          });\n          targetShopItem.inCart = false;\n          const targetIndex = this.$data.cartItems.findIndex(\n            (cartItem) => cartItem.id === item.id\n          );\n          this.$data.cartItems.splice(targetIndex, 1);\n        }\n      });\n    },\n\n    increment(item) {\n      item.count++;\n    }\n  }\n};\n</script>\n\n<style lang=\"scss\">\n$white: #fff;\n$yellow: #f6c90e;\n$black: #303841;\n\nbody {\n  font-family: \"Rubik\", sans-serif;\n  color: $black;\n}\n\n.wrapper {\n  height: 100vh;\n  display: flex;\n  align-items: center;\n  justify-content: space-between;\n  position: relative;\n  flex-wrap: wrap;\n  padding: 40px 20px;\n  max-width: 720px;\n  margin: 0 auto;\n\n  &::before {\n    content: \"\";\n    display: block;\n    position: fixed;\n    width: 300%;\n    height: 100%;\n    top: 50%;\n    left: 50%;\n    border-radius: 100%;\n    transform: translateX(-50%) skewY(-8deg);\n    background-color: $yellow;\n    z-index: -1;\n    animation: wave 8s ease-in-out infinite alternate;\n  }\n\n  @keyframes wave {\n    0% {\n      transform: translateX(-50%) skew(0deg, -8deg);\n    }\n\n    100% {\n      transform: translateX(-30%) skew(8deg, -4deg);\n    }\n  }\n}\n\n.screen {\n  background-color: $white;\n  box-sizing: border-box;\n  width: 340px;\n  height: 600px;\n  box-shadow: 0 3.2px 2.2px rgba(0, 0, 0, 0.02),\n    0 7px 5.4px rgba(0, 0, 0, 0.028), 0 12.1px 10.1px rgba(0, 0, 0, 0.035),\n    0 19.8px 18.1px rgba(0, 0, 0, 0.042), 0 34.7px 33.8px rgba(0, 0, 0, 0.05),\n    0 81px 81px rgba(0, 0, 0, 0.07);\n  border-radius: 30px;\n  overflow-y: scroll;\n  padding: 0 28px;\n  position: relative;\n  margin-bottom: 20px;\n\n  &::before {\n    content: \"\";\n    display: block;\n    position: absolute;\n    width: 300px;\n    height: 300px;\n    border-radius: 100%;\n    background-color: $yellow;\n    top: -20%;\n    left: -50%;\n    z-index: 0;\n  }\n\n  &::-webkit-scrollbar {\n    display: none;\n  }\n\n  > .title {\n    font-size: 24px;\n    font-weight: bold;\n    margin: 20px 0;\n    position: relative;\n  }\n}\n\n.app-bar {\n  padding: 12px 0;\n  position: relative;\n\n  > .logo {\n    display: block;\n    width: 50px;\n  }\n}\n\n.shop-items {\n  position: relative;\n}\n\n.item-block {\n  padding: 40px 0 70px;\n\n  &:first-child {\n    padding-top: 0;\n  }\n\n  > .image-area {\n    border-radius: 30px;\n    height: 380px;\n    display: flex;\n    align-items: center;\n    overflow: hidden;\n\n    > .image {\n      display: block;\n      width: 100%;\n      filter: drop-shadow(0 30px 20px rgba(0, 0, 0, 0.2));\n      transform: rotate(-24deg);\n      margin-left: -16px;\n    }\n  }\n\n  > .name {\n    font-size: 20px;\n    font-weight: bold;\n    margin: 26px 0 20px;\n    line-height: 1.5;\n  }\n\n  > .description {\n    font-size: 13px;\n    color: #777;\n    line-height: 1.8;\n    margin-bottom: 20px;\n  }\n\n  > .bottom-area {\n    display: flex;\n    justify-content: space-between;\n    align-items: center;\n\n    > .price {\n      font-size: 18px;\n      font-weight: bold;\n    }\n\n    > .button {\n      cursor: pointer;\n      background-color: $yellow;\n      font-weight: bold;\n      font-size: 14px;\n      box-sizing: border-box;\n      height: 46px;\n      padding: 16px 20px;\n      border-radius: 100px;\n      box-shadow: 0 3px 6px rgba(0, 0, 0, 0.2);\n      transition: box-shadow 0.4s, background-color 0.2s;\n      user-select: none;\n      white-space: nowrap;\n      position: relative;\n      display: flex;\n      align-items: center;\n      overflow: hidden;\n\n      &:hover {\n        background-color: lighten($yellow, 10%);\n        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);\n      }\n\n      &.-active {\n        pointer-events: none;\n        cursor: default;\n      }\n\n      > .cover {\n        width: 16px;\n        height: 16px;\n        position: absolute;\n        display: flex;\n        justify-content: center;\n        align-items: center;\n\n        > .check {\n          width: 100%;\n          height: 100%;\n          transform: translate(-100%, -73%) rotate(-45deg);\n          position: absolute;\n          left: 50%;\n          top: 50%;\n\n          &::before,\n          &::after {\n            content: \"\";\n            display: block;\n            background-color: $black;\n            position: absolute;\n            left: 0;\n            bottom: 0;\n            border-radius: 10px;\n          }\n\n          &::before {\n            width: 3px;\n            height: 50%;\n          }\n\n          &::after {\n            width: 100%;\n            height: 3px;\n          }\n        }\n      }\n    }\n  }\n}\n\n.cart-items {\n  position: relative;\n}\n\n.no-content {\n  position: relative;\n\n  > .text {\n    font-size: 14px;\n  }\n}\n\n.cart-item {\n  display: flex;\n  padding: 20px 0;\n\n  > .right {\n    > .name {\n      font-size: 14px;\n      font-weight: bold;\n      line-height: 1.5;\n      margin-bottom: 10px;\n    }\n\n    > .price {\n      font-size: 20px;\n      font-weight: bold;\n      margin-bottom: 16px;\n    }\n\n    > .count {\n      display: flex;\n      align-items: center;\n\n      > .number {\n        font-size: 14px;\n        margin: 0 14px;\n        width: 20px;\n        text-align: center;\n      }\n\n      .button {\n        cursor: pointer;\n        width: 28px;\n        height: 28px;\n        border-radius: 100%;\n        background-color: #eee;\n        font-size: 16px;\n        font-weight: bold;\n        display: flex;\n        justify-content: center;\n        align-items: center;\n        transition: 0.2s;\n        user-select: none;\n\n        &:hover {\n          background-color: #ddd;\n        }\n      }\n    }\n  }\n}\n\n.cart-image {\n  width: 90px;\n  height: 90px;\n  border-radius: 100%;\n  background-color: #eee;\n  margin-right: 34px;\n\n  > .image-wrapper {\n    > .image {\n      display: block;\n      width: 140%;\n      transform: rotate(-28deg) translateY(-40px);\n      filter: drop-shadow(0 30px 20px rgba(0, 0, 0, 0.2));\n    }\n  }\n}\n\n.buttonText-leave-active,\n.buttonText-enter-active {\n  transition: opacity 0.2s, top 0.35s;\n}\n.buttonText-leave-to,\n.buttonText-enter {\n  opacity: 0;\n}\n\n.cartList-enter-active {\n  transition: all 2s;\n\n  > .right {\n    > .name,\n    > .price {\n      transition: 0.4s;\n    }\n\n    > .name {\n      transition-delay: 0.7s;\n    }\n\n    > .price {\n      transition-delay: 0.85s;\n    }\n\n    > .count {\n      transition: opacity 0.4s;\n      transition-delay: 1s;\n    }\n  }\n\n  .cart-image {\n    transition: 0.5s cubic-bezier(0.79, 0.01, 0.22, 1);\n\n    > .image-wrapper {\n      transition: 0.5s cubic-bezier(0.79, 0.01, 0.22, 1) 0.1s;\n    }\n  }\n}\n\n.cartList {\n  &-enter {\n    > .right {\n      > .name,\n      > .price {\n        opacity: 0;\n        transform: translateX(30px);\n      }\n\n      .count {\n        opacity: 0;\n      }\n    }\n\n    .cart-image {\n      transform: scale(0);\n\n      > .image-wrapper {\n        transform: scale(0);\n      }\n    }\n  }\n\n  &-leave-active {\n    transition: 0.7s cubic-bezier(0.79, 0.01, 0.22, 1);\n    position: absolute;\n  }\n\n  &-leave-to {\n    transform: scale(0);\n    opacity: 0;\n  }\n\n  &-move {\n    transition: 0.7s cubic-bezier(0.79, 0.01, 0.22, 1);\n  }\n}\n\n.noContent {\n  &-enter-active,\n  &-leave-active {\n    transition: opacity 0.5s;\n    position: absolute;\n  }\n\n  &-enter,\n  &-leave-to {\n    opacity: 0;\n  }\n}\n</style>\n","body {\n  font-family: \"Rubik\", sans-serif;\n  color: #303841;\n}\n\n.wrapper {\n  height: 100vh;\n  display: flex;\n  align-items: center;\n  justify-content: space-between;\n  position: relative;\n  flex-wrap: wrap;\n  padding: 40px 20px;\n  max-width: 720px;\n  margin: 0 auto;\n}\n.wrapper::before {\n  content: \"\";\n  display: block;\n  position: fixed;\n  width: 300%;\n  height: 100%;\n  top: 50%;\n  left: 50%;\n  border-radius: 100%;\n  transform: translateX(-50%) skewY(-8deg);\n  background-color: #f6c90e;\n  z-index: -1;\n  animation: wave 8s ease-in-out infinite alternate;\n}\n@keyframes wave {\n  0% {\n    transform: translateX(-50%) skew(0deg, -8deg);\n  }\n  100% {\n    transform: translateX(-30%) skew(8deg, -4deg);\n  }\n}\n\n.screen {\n  background-color: #fff;\n  box-sizing: border-box;\n  width: 340px;\n  height: 600px;\n  box-shadow: 0 3.2px 2.2px rgba(0, 0, 0, 0.02), 0 7px 5.4px rgba(0, 0, 0, 0.028), 0 12.1px 10.1px rgba(0, 0, 0, 0.035), 0 19.8px 18.1px rgba(0, 0, 0, 0.042), 0 34.7px 33.8px rgba(0, 0, 0, 0.05), 0 81px 81px rgba(0, 0, 0, 0.07);\n  border-radius: 30px;\n  overflow-y: scroll;\n  padding: 0 28px;\n  position: relative;\n  margin-bottom: 20px;\n}\n.screen::before {\n  content: \"\";\n  display: block;\n  position: absolute;\n  width: 300px;\n  height: 300px;\n  border-radius: 100%;\n  background-color: #f6c90e;\n  top: -20%;\n  left: -50%;\n  z-index: 0;\n}\n.screen::-webkit-scrollbar {\n  display: none;\n}\n.screen > .title {\n  font-size: 24px;\n  font-weight: bold;\n  margin: 20px 0;\n  position: relative;\n}\n\n.app-bar {\n  padding: 12px 0;\n  position: relative;\n}\n.app-bar > .logo {\n  display: block;\n  width: 50px;\n}\n\n.shop-items {\n  position: relative;\n}\n\n.item-block {\n  padding: 40px 0 70px;\n}\n.item-block:first-child {\n  padding-top: 0;\n}\n.item-block > .image-area {\n  border-radius: 30px;\n  height: 380px;\n  display: flex;\n  align-items: center;\n  overflow: hidden;\n}\n.item-block > .image-area > .image {\n  display: block;\n  width: 100%;\n  filter: drop-shadow(0 30px 20px rgba(0, 0, 0, 0.2));\n  transform: rotate(-24deg);\n  margin-left: -16px;\n}\n.item-block > .name {\n  font-size: 20px;\n  font-weight: bold;\n  margin: 26px 0 20px;\n  line-height: 1.5;\n}\n.item-block > .description {\n  font-size: 13px;\n  color: #777;\n  line-height: 1.8;\n  margin-bottom: 20px;\n}\n.item-block > .bottom-area {\n  display: flex;\n  justify-content: space-between;\n  align-items: center;\n}\n.item-block > .bottom-area > .price {\n  font-size: 18px;\n  font-weight: bold;\n}\n.item-block > .bottom-area > .button {\n  cursor: pointer;\n  background-color: #f6c90e;\n  font-weight: bold;\n  font-size: 14px;\n  box-sizing: border-box;\n  height: 46px;\n  padding: 16px 20px;\n  border-radius: 100px;\n  box-shadow: 0 3px 6px rgba(0, 0, 0, 0.2);\n  transition: box-shadow 0.4s, background-color 0.2s;\n  user-select: none;\n  white-space: nowrap;\n  position: relative;\n  display: flex;\n  align-items: center;\n  overflow: hidden;\n}\n.item-block > .bottom-area > .button:hover {\n  background-color: #f8d43f;\n  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);\n}\n.item-block > .bottom-area > .button.-active {\n  pointer-events: none;\n  cursor: default;\n}\n.item-block > .bottom-area > .button > .cover {\n  width: 16px;\n  height: 16px;\n  position: absolute;\n  display: flex;\n  justify-content: center;\n  align-items: center;\n}\n.item-block > .bottom-area > .button > .cover > .check {\n  width: 100%;\n  height: 100%;\n  transform: translate(-100%, -73%) rotate(-45deg);\n  position: absolute;\n  left: 50%;\n  top: 50%;\n}\n.item-block > .bottom-area > .button > .cover > .check::before, .item-block > .bottom-area > .button > .cover > .check::after {\n  content: \"\";\n  display: block;\n  background-color: #303841;\n  position: absolute;\n  left: 0;\n  bottom: 0;\n  border-radius: 10px;\n}\n.item-block > .bottom-area > .button > .cover > .check::before {\n  width: 3px;\n  height: 50%;\n}\n.item-block > .bottom-area > .button > .cover > .check::after {\n  width: 100%;\n  height: 3px;\n}\n\n.cart-items {\n  position: relative;\n}\n\n.no-content {\n  position: relative;\n}\n.no-content > .text {\n  font-size: 14px;\n}\n\n.cart-item {\n  display: flex;\n  padding: 20px 0;\n}\n.cart-item > .right > .name {\n  font-size: 14px;\n  font-weight: bold;\n  line-height: 1.5;\n  margin-bottom: 10px;\n}\n.cart-item > .right > .price {\n  font-size: 20px;\n  font-weight: bold;\n  margin-bottom: 16px;\n}\n.cart-item > .right > .count {\n  display: flex;\n  align-items: center;\n}\n.cart-item > .right > .count > .number {\n  font-size: 14px;\n  margin: 0 14px;\n  width: 20px;\n  text-align: center;\n}\n.cart-item > .right > .count .button {\n  cursor: pointer;\n  width: 28px;\n  height: 28px;\n  border-radius: 100%;\n  background-color: #eee;\n  font-size: 16px;\n  font-weight: bold;\n  display: flex;\n  justify-content: center;\n  align-items: center;\n  transition: 0.2s;\n  user-select: none;\n}\n.cart-item > .right > .count .button:hover {\n  background-color: #ddd;\n}\n\n.cart-image {\n  width: 90px;\n  height: 90px;\n  border-radius: 100%;\n  background-color: #eee;\n  margin-right: 34px;\n}\n.cart-image > .image-wrapper > .image {\n  display: block;\n  width: 140%;\n  transform: rotate(-28deg) translateY(-40px);\n  filter: drop-shadow(0 30px 20px rgba(0, 0, 0, 0.2));\n}\n\n.buttonText-leave-active,\n.buttonText-enter-active {\n  transition: opacity 0.2s, top 0.35s;\n}\n\n.buttonText-leave-to,\n.buttonText-enter {\n  opacity: 0;\n}\n\n.cartList-enter-active {\n  transition: all 2s;\n}\n.cartList-enter-active > .right > .name,\n.cartList-enter-active > .right > .price {\n  transition: 0.4s;\n}\n.cartList-enter-active > .right > .name {\n  transition-delay: 0.7s;\n}\n.cartList-enter-active > .right > .price {\n  transition-delay: 0.85s;\n}\n.cartList-enter-active > .right > .count {\n  transition: opacity 0.4s;\n  transition-delay: 1s;\n}\n.cartList-enter-active .cart-image {\n  transition: 0.5s cubic-bezier(0.79, 0.01, 0.22, 1);\n}\n.cartList-enter-active .cart-image > .image-wrapper {\n  transition: 0.5s cubic-bezier(0.79, 0.01, 0.22, 1) 0.1s;\n}\n\n.cartList-enter > .right > .name,\n.cartList-enter > .right > .price {\n  opacity: 0;\n  transform: translateX(30px);\n}\n.cartList-enter > .right .count {\n  opacity: 0;\n}\n.cartList-enter .cart-image {\n  transform: scale(0);\n}\n.cartList-enter .cart-image > .image-wrapper {\n  transform: scale(0);\n}\n.cartList-leave-active {\n  transition: 0.7s cubic-bezier(0.79, 0.01, 0.22, 1);\n  position: absolute;\n}\n.cartList-leave-to {\n  transform: scale(0);\n  opacity: 0;\n}\n.cartList-move {\n  transition: 0.7s cubic-bezier(0.79, 0.01, 0.22, 1);\n}\n\n.noContent-enter-active, .noContent-leave-active {\n  transition: opacity 0.5s;\n  position: absolute;\n}\n.noContent-enter, .noContent-leave-to {\n  opacity: 0;\n}\n\n/*# sourceMappingURL=pen.vue.map */"]}, media: undefined });

  };

  const __vue_scope_id__ = undefined;
 
  const __vue_module_identifier__ = undefined;
  
  const __vue_is_functional_template__ = false;
 
  
 
  

  
  const __vue_component__ = normalizeComponent(
    { render: __vue_render__, staticRenderFns: __vue_staticRenderFns__ },
    __vue_inject_styles__,
    __vue_script__,
    __vue_scope_id__,
    __vue_is_functional_template__,
    __vue_module_identifier__,
    false,
    createInjector,
    undefined,
    undefined
  );

export default __vue_component__;