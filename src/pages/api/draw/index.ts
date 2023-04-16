// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
// import type { NextApiRequest, NextApiResponse } from 'next'

// type Data = {
//   name: string
// }

// export default function handler(
//   req: NextApiRequest,
//   res: NextApiResponse<Data>
// ) {
//   res.status(200).json({ name: 'John Doe' })
// }

const VibePrompts: any = {
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

const VibeDescriptionPrefixes: any = {
  "ultra-realistic": "A photo of ",
  "low-poly": "A low-poly rendering of ",
  anime: "An anime-style rendering of",
  cartoon: "A cartoon-style rendering of",
  painting: "A painting of ",
};

export default async function handler(request: any, respone: any) {
  if (request.method === "GET") {
    return respone.status(200).json({ message: "hello" });
  }

  if (request.method === "POST") {
    const { vibe, description, imageUrl } = await request.body;

    if (!vibe || !description || !imageUrl) {
      throw new Error("Missing required fields");
    }

    let res = await fetch("https://api.replicate.com/v1/predictions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Token ${process.env.REPLICATE_API_KEY}`,
      },
      body: JSON.stringify({
        version:
          "435061a1b5a4c1e26740464bf786efdfa9cb3a3ac488595a2de23e143fdb0117",
        input: {
          image: imageUrl,
          prompt: `${VibeDescriptionPrefixes[vibe]}${description}`,
          ddim_steps: 30,
          scale: 15,
          a_prompt: VibePrompts[vibe],
          n_prompt:
            "longbody, lowres, bad anatomy, bad hands, missing fingers, extra digit, fewer digits, cropped, worst quality, low quality",
        },
      }),
    });

    let resJson = await res.json();

    let pollUrl = resJson.urls.get;

    let originalImageUrl = resJson.input.image;

    let id = resJson.id;

    let genImageUrl: string | null = null;

    while (!genImageUrl) {
      let completedRes = await fetch(pollUrl, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Token ${process.env.REPLICATE_API_KEY}`,
        },
      });

      let jsonResponseDone = await completedRes.json();

      if (jsonResponseDone.status === "succeeded") {
        genImageUrl = jsonResponseDone.output[1] as string;
      } else if (jsonResponseDone.status === "failed") {
        throw new Error("Failed to generate image");
      } else {
        await new Promise((resolve) => setTimeout(resolve, 1000));
      }
    }

    return respone
      .status(200)
      .json({ orignal: originalImageUrl, generated: genImageUrl, id });

    // return new Response(
    //   JSON.stringify({
    //     orignal: originalImageUrl,
    //     generated: genImageUrl,
    //     id,
    //   })
    // );
  }
}
