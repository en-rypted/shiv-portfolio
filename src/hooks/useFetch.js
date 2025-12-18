import { useEffect, useState } from "react";

export default function useFetch(url) {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        let mounted = true;

        const getData = async () => {
            try {
                const res = await fetch(url);
                const json = await res.json();

                if (!mounted) return;

                setData(json.data);
                setLoading(false);
            } catch (err) {
                if (!mounted) return;
                setError(err);
                setLoading(false);
            }
        };

        getData();
        return () => (mounted = false);
    }, [url]);

    return { data, loading, error };
}
