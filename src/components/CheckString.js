var blank = /\s+/g;
var special = /[\[\]\{\}\(\),.`~!@#$%^&*|\\\'\";:\/?]/gi;

export const CheckSpaceNSpecial = (string) => {

    return blank.test(string) || special.test(string);
}

// export const CheckSpecial = (string) => {

//     return special.test(string);
// }

export const ReplaceSpaceNSpecial = (string) => {

    return string.replace(blank, "").replace(special, "");
}

// export const ReplaceSpecial = (string) => {

//     return string.replace(special, "");
// }