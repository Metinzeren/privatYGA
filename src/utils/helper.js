export const removeBlank = (data) => data.replace(/<br\s*\/?>/g, "<br/>");
export const removeSrc = (data) => data.match(/src="([^"]+)"/)[1];
