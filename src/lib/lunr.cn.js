/*! 
 * Lunr languages, `Chinese` language 
 * https://github.com/MihaiValentin/lunr-languages 
 * 
 * Copyright 2017, Xiang Li 
 * http://www.mozilla.org/MPL/ 
 */
/*! 
 * based on 
 * Snowball JavaScript Library v0.3 
 * http://code.google.com/p/urim/ 
 * http://snowball.tartarus.org/ 
 * 
 * Copyright 2010, Oleg Mazko 
 * http://www.mozilla.org/MPL/ 
 */
/** 
 * export the module via AMD, CommonJS or as a browser global 
 * Export code from https://github.com/umdjs/umd/blob/master/returnExports.js 
 */
;
(function(root, factory) {
    if (typeof define === 'function' && define.amd) {
        // AMD. Register as an anonymous module.
        define(factory)
    } else if (typeof exports === 'object') {
        /**
         * Node. Does not work with strict CommonJS, but
         * only CommonJS-like environments that support module.exports,
         * like Node.
         */
        module.exports = factory()
    } else {
        // Browser globals (root is window)
        factory()(root.lunr);
    }
}(this, function() {
    /**
     * Just return a value to define the module export.
     * This example returns an object, but the module
     * can return a function as the exported value.
     */
    return function(lunr) {
        /* throw error if lunr is not yet included */
        if ('undefined' === typeof lunr) {
            throw new Error('Lunr is not present. Please include / require Lunr before this script.');
        }

        /* throw error if lunr stemmer support is not yet included */
        if ('undefined' === typeof lunr.stemmerSupport) {
            throw new Error('Lunr stemmer support is not present. Please include / require Lunr stemmer support before this script.');
        }

        /*
        Japanese tokenization is trickier, since it does not
        take into account spaces.
        Since the tokenization function is represented different
        internally for each of the Lunr versions, this had to be done
        in order to try to try to pick the best way of doing this based
        on the Lunr version
         */
        var isLunr2 = lunr.version[0] == "2";

        /* register specific locale function */
        lunr.cn = function() {
            this.pipeline.reset();
            this.pipeline.add(
                lunr.cn.trimmer,
                lunr.cn.stopWordFilter,
                lunr.cn.stemmer
            );

            // change the tokenizer for cnpanese one
            if (isLunr2) { // for lunr version 2.0.0
                this.tokenizer = lunr.cn.tokenizer;
            } else {
                if (lunr.tokenizer) { // for lunr version 0.6.0
                    lunr.tokenizer = lunr.cn.tokenizer;
                }
                if (this.tokenizerFn) { // for lunr version 0.7.0 -> 1.0.0
                    this.tokenizerFn = lunr.cn.tokenizer;
                }
            }
        };
        var segmenter = new lunr.TinySegmenter(); // インスタンス生成

        lunr.cn.tokenizer = function(obj) {
            var i;
            var str;
            var len;
            var segs;
            var tokens;
            var char;
            var sliceLength;
            var sliceStart;
            var sliceEnd;
            var segStart;

            if (!arguments.length || obj == null || obj == undefined)
                return [];

            if (Array.isArray(obj)) {
                return obj.map(
                    function(t) {
                        return isLunr2 ? new lunr.Token(t.toLowerCase()) : t.toLowerCase();
                    }
                );
            }

            str = obj.toString().toLowerCase().replace(/^\s+/, '');
            for (i = str.length - 1; i >= 0; i--) {
                if (/\S/.test(str.charAt(i))) {
                    str = str.substring(0, i + 1);
                    break;
                }
            }

            tokens = [];
            len = str.length;
            for (sliceEnd = 0, sliceStart = 0; sliceEnd <= len; sliceEnd++) {
                char = str.charAt(sliceEnd);
                sliceLength = sliceEnd - sliceStart;

                if ((char.match(/\s/) || sliceEnd == len)) {
                    if (sliceLength > 0) {
                        segs = segmenter.segment(str.slice(sliceStart, sliceEnd)).filter(
                            function(token) {
                                return !!token;
                            }
                        );

                        segStart = sliceStart;
                        for (i = 0; i < segs.length; i++) {
                            if (isLunr2) {
                                tokens.push(
                                    new lunr.Token(
                                        segs[i], {
                                            position: [segStart, segs[i].length],
                                            index: tokens.length
                                        }
                                    )
                                );
                            } else {
                                tokens.push(segs[i]);
                            }
                            segStart += segs[i].length;
                        }
                    }

                    sliceStart = sliceEnd + 1;
                }
            }

            return tokens;
        }

        /* lunr stemmer function */
        lunr.cn.stemmer = (function() {

            /* TODO cnpanese stemmer  */
            return function(word) {
                return word;
            }
        })();
        lunr.Pipeline.registerFunction(lunr.cn.stemmer, 'stemmer-cn');

        /* lunr trimmer function */
        lunr.cn.wordCharacters = "一二三四五六七八九十百千万億兆一-龠々〆ヵヶぁ-んァ-ヴーｱ-ﾝﾞa-zA-Zａ-ｚＡ-Ｚ0-9０-９";
        lunr.cn.trimmer = lunr.trimmerSupport.generateTrimmer(lunr.cn.wordCharacters);
        lunr.Pipeline.registerFunction(lunr.cn.trimmer, 'trimmer-cn');

        /* lunr stop word filter. see http://www.ranks.nl/stopwords/cnpanese */
        lunr.cn.stopWordFilter = lunr.generateStopWordFilter(
            '的 一 不 在 人 有 是 为 以 于 上 他 而 后 之 来 及 了 因 下 可 到 由 这 与 也 此 但 并 个 其 已 无 小 我 们 起 最 再 今 去 好 只 又 或 很 亦 某 把 那 你 乃 它 吧 被 比 别 趁 当 从 到 得 打 凡 儿 尔 该 各 给 跟 和 何 还 即 几 既 看 据 距 靠 啦 了 另 么 每 们 嘛 拿 哪 那 您 凭 且 却 让 仍 啥 如 若 使 谁 虽 随 同 所 她 哇 嗡 往 哪 些 向 沿 哟 用 于 咱 则 怎 曾 至 致 着 诸 自'.split(' '));
        lunr.Pipeline.registerFunction(lunr.cn.stopWordFilter, 'stopWordFilter-cn');

        // alias ja => jp for backward-compatibility.
        // jp is the country code, while ja is the language code
        // a new lunr.ja.js has been created, but in order to
        // keep the backward compatibility, we'll leave the lunr.jp.js
        // here for a while, and just make it use the new lunr.ja.js
        lunr.cn = lunr.cn;
        lunr.Pipeline.registerFunction(lunr.cn.stemmer, 'stemmer-cn');
        lunr.Pipeline.registerFunction(lunr.cn.trimmer, 'trimmer-cn');
        lunr.Pipeline.registerFunction(lunr.cn.stopWordFilter, 'stopWordFilter-cn');
    };
}))