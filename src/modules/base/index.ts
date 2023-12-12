export const BASE_HTML = `
<html>
  <head>
    <script src="https://cdn.tailwindcss.com"></script>
    <style>
    </style>
    
  </head>

  <body>
    <div id="root"></div>

    <script type="module">
    import React from "https://esm.sh/react";
    import { render } from "https://esm.sh/react-dom";

    <<<REPLACE_SCRIPTS_HERE>>>

    render(React.createElement(Component,null), document.getElementById("root"));
    </script>
  </body>
</html>
`;
