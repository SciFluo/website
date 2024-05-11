export default () => {
	const search = document.getElementById("header_search");

	// 获取URL参数并设置给搜索框
	search.value = decodeURIComponent(
		new URLSearchParams(window.location.search).get("search") || ""
	);

	search.addEventListener("keypress", (event) => {
		if (event.key === "Enter" && search.value.trim() !== "") {
			window.location.href = `${window.location.origin}/search.html?search=${encodeURIComponent(search.value.trim())}`;
		}
	});
};
