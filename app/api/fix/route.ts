import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  try {
    const { text } = await req.json();
    const apiKey = process.env.GEMINI_API_KEY;

    if (!apiKey) {
      return NextResponse.json({ error: 'Gemini API key not found. Please add GEMINI_API_KEY to your .env.local file.' }, { status: 500 });
    }

    if (!text) {
      return NextResponse.json({ error: 'Text to fix is required.' }, { status: 400 });
    }

    if (text.length > 8000) {
      return NextResponse.json({ error: 'Text is too long. Please limit to 8000 characters.' }, { status: 400 });
    }

    const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${apiKey}`;

    const body = {
      contents: [
        {
          parts: [
            {
              text: `You are an expert in English grammar. Please correct the following text for any grammatical errors and typos. Keep the tone casual and natural - avoid overly formal punctuation like semicolons unless absolutely necessary. Prefer simple sentences with periods or commas. Only return the corrected text, without any introductory phrases or explanations.\n\nOriginal text: "${text}"\n\nCorrected text:`,
            },
          ],
        },
      ],
    };

    const geminiRes = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
    });

    if (!geminiRes.ok) {
      const errorBody = await geminiRes.text();
      console.error('Gemini API Error:', {
        status: geminiRes.status,
        statusText: geminiRes.statusText,
        body: errorBody,
        url: url
      });
      return NextResponse.json({ 
        error: `Gemini API error: ${geminiRes.statusText} (${geminiRes.status})` 
      }, { status: geminiRes.status });
    }

    const data = await geminiRes.json();
    const fixedText = data.candidates?.[0]?.content?.parts?.[0]?.text?.trim() || 'Could not fix text.';

    return NextResponse.json({ fixedText });

  } catch (error) {
    console.error('Internal Server Error:', error);
    return NextResponse.json({ error: 'An internal server error occurred.' }, { status: 500 });
  }
}
