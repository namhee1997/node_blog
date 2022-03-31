const Handlebars = require("handlebars");
module.exports = {
    sum: (a, b) => a + b,
    sortTable: (fieldName, sort) => {

        let sortTypeCheck = fieldName == sort.column ? sort.type : "default";

        const icons = {
            default: "elevator",
            asc: "sort-ascending",
            desc: "sort-descending",
        }
        const typeSorts = {
            default: "desc",
            asc: "desc",
            desc: "asc",
        }

        let icon = icons[sortTypeCheck]
        let typeSort = typeSorts[sortTypeCheck]

        const href = Handlebars.escapeExpression(`?_sort&column=${fieldName}&type=${typeSort}`);
        const outPut = `<a href="${href}">
                    <span class="oi" data-glyph="${icon}"></span>
                </a>`;

        return new Handlebars.SafeString(outPut);
    },
};