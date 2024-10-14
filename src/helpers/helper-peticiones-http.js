export const helperPeticionesHttp = async (url, options) => {
    try {
      const res = await fetch(url, options);
      if (!res.ok) {
        const errorMessage = await res.text(); 
        throw new Error(`Error ${res.status}: ${errorMessage}`);
      }
      const data = await res.json();
      return data;
    } catch (error) {
      console.error('[helperPeticionesHttp]', error);
    }
  };
  