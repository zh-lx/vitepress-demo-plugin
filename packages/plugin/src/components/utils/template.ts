export const genHtmlCode = ({
  code,
  styles,
  links,
}: {
  code: string;
  styles: string;
  links: string;
}) => {
  return `
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Document</title>
    ${styles}
    ${links}
    <style>
      body {
        min-height: 0;
      }
    </style>
  </head>
  <body>
    ${code}
  </body>
</html>
  `;
};
