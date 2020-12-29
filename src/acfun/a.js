function p1() {
  return Promise.resolve("p1");
}
function p2() {
  return Promise.reject("p2");
}
function p3() {
  return Promise.resolve("p2");
}

async function main() {
  try {
    const p1r = await p1();
    const p2r = await p2();
    const p3r = await p2();
    console.log("p1r: ", p1r);
    console.log("p2r: ", p2r);
    console.log("p3r: ", p3r);
  } catch (error) {
    console.log("error: ", error);
  }
}

main();
