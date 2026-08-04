export const detectCodeLanguage = (fileName = "") => {
  const ext = fileName.split(".").pop().toLowerCase();

  const map = {
    // Web
    html: "html",
    htm: "html",
    css: "css",
    scss: "scss",
    sass: "sass",
    less: "less",

    // JavaScript / TypeScript
    js: "javascript",
    jsx: "jsx",
    mjs: "javascript",
    cjs: "javascript",
    ts: "typescript",
    tsx: "tsx",

    // Data / Config
    json: "json",
    jsonc: "json",
    yaml: "yaml",
    yml: "yaml",
    toml: "toml",
    xml: "xml",
    csv: "csv",
    env: "bash",
    ini: "ini",

    // Markdown / Docs
    md: "markdown",
    mdx: "markdown",
    txt: "plaintext",
    rst: "restructuredtext",

    // Backend languages
    py: "python",
    rb: "ruby",
    php: "php",
    java: "java",
    kt: "kotlin",
    kts: "kotlin",
    go: "go",
    rs: "rust",
    c: "c",
    h: "c",
    cpp: "cpp",
    cc: "cpp",
    cxx: "cpp",
    hpp: "cpp",
    cs: "csharp",
    swift: "swift",
    m: "objectivec",
    scala: "scala",
    dart: "dart",
    lua: "lua",
    perl: "perl",
    pl: "perl",
    r: "r",
    jl: "julia",
    ex: "elixir",
    exs: "elixir",
    erl: "erlang",
    hs: "haskell",
    clj: "clojure",
    groovy: "groovy",
    elm: "elm",
    fs: "fsharp",
    fsx: "fsharp",
    vb: "vbnet",

    // Shell / Scripting
    sh: "bash",
    bash: "bash",
    zsh: "bash",
    ps1: "powershell",
    bat: "batch",
    cmd: "batch",

    // Database
    sql: "sql",
    prisma: "prisma",
    graphql: "graphql",
    gql: "graphql",

    // Templating
    vue: "vue",
    svelte: "svelte",
    astro: "astro",
    twig: "twig",
    hbs: "handlebars",
    ejs: "ejs",
    liquid: "liquid",

    // Infra / DevOps
    dockerfile: "dockerfile",
    docker: "dockerfile",
    tf: "hcl",
    tfvars: "hcl",
    makefile: "makefile",
    nginx: "nginx",
    conf: "ini",

    // Misc
    diff: "diff",
    patch: "diff",
    log: "log",
    proto: "protobuf",
    wasm: "wasm",
    asm: "asm",
    s: "asm",
  };

  // Handle filenames with no extension but known conventions
  const base = fileName.toLowerCase();
  if (base === "dockerfile") return "dockerfile";
  if (base === "makefile") return "makefile";
  if (base === ".gitignore" || base === ".env") return "bash";

  return map[ext] || "plaintext";
};
