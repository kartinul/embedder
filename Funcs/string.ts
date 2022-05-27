export function toTitleCase(s: string) {
  s = s || "";
  return s.toLowerCase()?.replace(/\b((m)(a?c))?(\w)/g, function ($1, $2, $3, $4, $5) {
    if ($2) {
      return $3.toUpperCase() + $4 + $5.toUpperCase();
    }

    return $1.toUpperCase();
  });
}

export const randId = () => {
  const alphabets = "qwertyuiopasdfghjklzxcvbnmQWERTYUIOPASDFGHJKLZXCVBNM";
  let rand = "";

  for (let i = 0; i < 4; i++) {
    rand += alphabets[Math.floor(Math.random() * alphabets.length)];
  }

  return rand;
};

// export const g = (t, custom) => {
//   custom = custom || "value";
//   return (document.getElementById(t)[custom] || "").replace(/</gi, "⪡").replace(/>/gi, "⪢");
// };
