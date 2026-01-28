type ItineraryDay = {
  day: number;
  theme: string;
  activities: {
    time: string;
    activity_name: string;
    description: string;
    cost_thb: number;
    activity_photos: string[];
    youtube_query?: string;
    youtube_vlog_link?: string;
  }[];
};

const YOUTUBE_CACHE = new Map<string, string>();

const sleep = (ms: number) => new Promise(res => setTimeout(res, ms));

async function retry<T>(
  fn: () => Promise<T>,
  retries = 2,
  delay = 400
): Promise<T> {
  try {
    return await fn();
  } catch (err) {
    if (retries <= 0) throw err;
    await sleep(delay);
    return retry(fn, retries - 1, delay * 1.5);
  }
}

/**
 * Fetch YouTube vlog link for a single activity
 */
export async function fetchYoutubeLink(
  youtubeQuery: string,
  YT_KEY: string
): Promise<string | null> {
  if (!youtubeQuery) return null;

  // ✅ Cache check
  if (YOUTUBE_CACHE.has(youtubeQuery)) {
    return YOUTUBE_CACHE.get(youtubeQuery) || null;
  }

  const ytUrl =
    "https://www.googleapis.com/youtube/v3/search?" +
    "part=snippet&" +
    "q=" + encodeURIComponent(youtubeQuery) + "&" +
    "type=video&" +
    "maxResults=1&" +
    "order=relevance&" +
    "safeSearch=strict&" +
    "key=" + YT_KEY;

  try {
    const data = await retry(async () => {
      const res = await fetch(ytUrl);
      if (!res.ok) throw new Error("YT fetch failed");
      return res.json();
    });

    const videoId = data?.items?.[0]?.id?.videoId;
    if (!videoId) return null;

    const link = `https://www.youtube.com/watch?v=${videoId}`;

    // ✅ Cache the result
    YOUTUBE_CACHE.set(youtubeQuery, link);

    return link;
  } catch (err) {
    console.warn(`⚠️ YouTube fetch failed for query: ${youtubeQuery}`);
    return null;
  }
}

export async function itineraryWithYoutube(
  itinerary: ItineraryDay[],
  YT_KEY: string
): Promise<ItineraryDay[]> {
  return Promise.all(
    itinerary.map(async (day, dayIndex) => {
      const enrichedActivities = await Promise.all(
        day.activities.map(async (activity, actIndex) => {
          if (!activity.youtube_query) return activity;

          // ✅ Cache check
          if (YOUTUBE_CACHE.has(activity.youtube_query)) {
            return {
              ...activity,
              youtube_vlog_link: YOUTUBE_CACHE.get(activity.youtube_query),
            };
          }

          const ytUrl =
            "https://www.googleapis.com/youtube/v3/search?" +
            "part=snippet&" +
            "q=" + encodeURIComponent(activity.youtube_query) + "&" +
            "type=video&" +
            "maxResults=1&" +
            "order=relevance&" +
            "safeSearch=strict&" +
            "key=" + YT_KEY;

          try {
            const data = await retry(async () => {
              const res = await fetch(ytUrl);
              if (!res.ok) throw new Error("YT fetch failed");
              return res.json();
            });

            const videoId = data?.items?.[0]?.id?.videoId;
            if (!videoId) return activity;

            const link = `https://www.youtube.com/watch?v=${videoId}`;

            YOUTUBE_CACHE.set(activity.youtube_query, link);

            return {
              ...activity,
              youtube_vlog_link: link,
            };
          } catch (err) {
            console.warn(
              `⚠️ YouTube failed (Day ${dayIndex + 1}, Activity ${actIndex + 1})`
            );
            return activity;
          }
        })
      );

      return {
        ...day,
        activities: enrichedActivities,
      };
    })
  );
}
