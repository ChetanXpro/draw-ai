import { log } from "console";

const VibePrompts = {
  "ultra-realistic":
    "ultra realistic, best quality, real world, high resolution, extremely detailed, 4k",
  "low-poly": "low poly, low polygon, low poly art, low poly style",
  anime:
    "digital painting, comic style, artstation, concept art, smooth, sharp focus, illustration, art by artgerm and greg rutkowski and alphonse mucha",
  cartoon:
    "2d animation, cartoon, low detail, solid colors, limited palette, simplistic illustration, minimal design",
  painting:
    "olpntng style, girl,cute,real, oil painting, heavy strokes, paint dripping",
};

const VibeDescriptionPrefixes = {
  "ultra-realistic": "A photo of a ",
  "low-poly": "A low-poly rendering of a ",
  anime: "An anime-style rendering of a ",
  cartoon: "A cartoon-style rendering of a ",
  painting: "A painting of a ",
};

export async function POST(request, response) {
  // const { vibe, description, imageUrl } = await request.json();
  const vibe = "ultra-realistic";
  const description = "cat";

  let imageUrl =
    "https://upcdn.io/kW15bDc/raw/uploads/2023/04/15/file-4v9x.jpeg";

  log(
    JSON.stringify({
      version:
        "435061a1b5a4c1e26740464bf786efdfa9cb3a3ac488595a2de23e143fdb0117",
      inputs: {
        image: imageUrl,
        prompt: `${VibeDescriptionPrefixes[vibe]}${description}}`,
        ddim_steps: 30,
        scale: 15,
        a_prompt: VibePrompts[vibe],
        n_prompt:
          "longbody, lowres, bad anatomy, bad hands, missing fingers, extra digit, fewer digits, cropped, worst quality, low quality",
      },
    })
  );

  let res = await fetch("https://api.replicate.com/v1/predictions", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Token ${process.env.REPLICATE_API_KEY as string}`,
    },
    body: JSON.stringify({
      version:
        "435061a1b5a4c1e26740464bf786efdfa9cb3a3ac488595a2de23e143fdb0117",
      inputs: {
        image: imageUrl,
        prompt: `${VibeDescriptionPrefixes[vibe]}${description}}`,
        ddim_steps: 30,
        scale: 15,
        a_prompt: VibePrompts[vibe],
        n_prompt:
          "longbody, lowres, bad anatomy, bad hands, missing fingers, extra digit, fewer digits, cropped, worst quality, low quality",
      },
    }),
  });

  let resJson = await res.json();

  log(resJson);

  let pollUrl = resJson.urls.get;

  let originalImageUrl = resJson.inputs.image;

  let id = resJson.id;

  let genImageUrl: string | null = null;

  while (!genImageUrl) {
    let completedRes = await fetch(pollUrl, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Token ${process.env.REPLICATE_API_KEY as string}`,
      },
    });

    let jsonResponseDone = await completedRes.json();

    if (jsonResponseDone.status === "succeeded") {
      genImageUrl = jsonResponseDone.outputs[1] as string;
    } else if (jsonResponseDone.status === "failed") {
      break;
    } else {
      await new Promise((resolve) => setTimeout(resolve, 1000));
    }
  }

  return response.ststus(200).json({
    orignal: originalImageUrl,
    generated: genImageUrl,
    id: id,
  });
}
