const handleError = (err) => {
  console.warn(err);
  return new Response(
    JSON.stringify({
      code: 400,
      message: "잠시 뒤 다시 시도해주세요",
    })
  );
};

const getData = async (fileName) => {
  const res = await fetch(`/${fileName}`).catch(handleError);
  console.log("res", res);
  if (res.ok) {
    return res.json();
  } else {
    alert("잠시 뒤 다시 시도해주세요");
  }
};

export { getData };
