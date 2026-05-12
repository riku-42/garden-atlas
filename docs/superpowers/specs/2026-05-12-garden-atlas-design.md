# Garden Atlas Product And Design Spec

**Date:** 2026-05-12
**Product:** 花园图鉴 / Garden Atlas
**Approved direction:** Prototype-first MVP

## Decision

Build Garden Atlas as a prototype-first MVP:

1. A polished mobile-first web prototype is the primary demo and design source of truth.
2. A React Native Expo scaffold mirrors the same product structure for native app development.
3. Documentation covers the refined PRD, implementation plan, UI copy, data model, and API contracts.
4. Real OpenAI image generation, auth, payments, cloud sync, and production map provider integration are contract-defined but mocked in the first prototype.

## Product Summary

Garden Atlas is an aesthetic AI botanical memory archive. It helps casual plant lovers photograph plants, transform the image into a collectible botanical specimen card, save location and notes, and browse a personal herbarium over time.

The product is not a scientific taxonomy tool, gardening operations system, or plant disease diagnosis app. Plant identification is treated as an editable AI estimate, while the core value is memory, beauty, and collecting.

## Users

Primary users:

- Plant aesthetic enthusiasts who collect visual memories from walks and social sharing.
- Urban garden explorers who visit parks, botanical gardens, and streetscapes.
- Casual gardeners who want beautiful documentation of flowers and growth.

Secondary users:

- Biology and art students using the cards as study references.
- Travelers building plant memories from different cities.

## MVP Scope

Must-have flows:

- Onboarding: three concise pages introducing discover, transform, and collect.
- Home: calm entry point with capture, a swipeable featured cover plant carousel, gallery, favorites, and settings access.
- Capture: camera-like interface with guidance overlay and photo/source controls.
- Generation: progress state that explains the AI transformation without exposing implementation detail.
- Result: generated botanical atlas card with original comparison and save action.
- Gallery: searchable/filterable archive grid.
- Detail: original photo, generated artwork, metadata, notes, tags, favorite, and share actions.
- Location: map-style location selection and custom place naming.

Should-have prototype states:

- Style mode picker: Scientific Herbarium, Vintage Botanical Book, Minimal Japanese Field Guide, Modern Editorial.
- Favorites and identified/unidentified filters.
- Share/export format selection.
- Original vs generated comparison slider.

Deferred from first prototype:

- Real account auth.
- Real GPT Image API call.
- Real plant recognition model.
- Payment/subscription implementation.
- Cloud sync.
- Production map SDK keys.
- Social feed, AR, plant care assistant, and collaborative gardens.

## UX Principles

- Elegant first: museum-like, breathable, botanical-book inspired.
- One-tap delight: Photo to AI processing to specimen card without a complex editor.
- Collection motivation: the gallery should make users want to capture more plants.
- Trust through editability: species and common names are editable because identification is an estimate.
- Calm progress: loading states should feel like specimen preparation, not a technical queue.

## Information Architecture

Primary navigation:

- Home
- Capture
- Gallery
- Detail
- Location
- Settings

Prototype route model:

- `/` home
- `/capture`
- `/generating`
- `/result/:id`
- `/gallery`
- `/entry/:id`
- `/map`
- `/onboarding`

Native scaffold route model:

- `Home`
- `Capture`
- `Generating`
- `Result`
- `Gallery`
- `EntryDetail`
- `LocationPicker`
- `Onboarding`

## Visual Direction

The interface should be refined, quiet, and tactile:

- Warm ivory and botanical paper surfaces.
- Moss green as the primary action color.
- Dark forest green for headings and high-emphasis text.
- Muted gold for rare premium/export accents.
- Serif display typography for specimen names and key titles.
- Minimal sans-serif for metadata, controls, and dense reading.
- Rounded cards with restrained shadows, never nested cards.
- Botanical imagery and atlas cards as the main visual signal.

## Key Screens

### Home

Purpose: invite capture and reinforce the emotional promise.

Primary content:

- Product title `花园图鉴`
- Short line: `探索植物之美，记录自然的每一刻。`
- Swipeable cover plant carousel (`封面植物`) showing recent or featured specimens.
- Carousel cards include plant image, common name, scientific name, location/date, and quick favorite state.
- Swipe behavior uses horizontal paging on touch devices and visible pagination dots; tapping a cover plant opens its detail page.
- Primary capture card: `拍照识别植物`
- Secondary actions: `图鉴全览`, `我的收藏`
- Bottom navigation with Home, Capture, Settings.

### Capture

Purpose: make taking or choosing a plant photo feel direct.

Primary content:

- Full-screen camera preview mock.
- Grid/guidance overlay.
- Flash, close, album, recognition history controls.
- Capture button.
- Tab control: `拍照`, `从相册选择`.

### Generating

Purpose: show progress and set expectations.

Progress states:

- `正在整理植物轮廓`
- `生成标本构图`
- `绘制细节特写`
- `写入图鉴标签`

### Result / Atlas Card

Purpose: show the collectible object.

Content:

- Generated card with specimen illustration.
- Species/common names.
- Detail thumbnails.
- Botanical line drawing row.
- Metadata chips.
- Save, share, favorite actions.
- Original/generated comparison slider.

### Gallery

Purpose: make the collection feel valuable and browsable.

Content:

- Filter chips: `全部`, `已识别`, `未识别`, `收藏`
- Search icon.
- Grid cards with plant image, common name, scientific name, date, city.

### Detail

Purpose: preserve the memory behind the card.

Content:

- Compact plant header.
- Capture time, location, notes, and tags.
- Original image.
- Generated card history.
- Share, save poster, edit actions.

### Location

Purpose: attach memory to place without demanding precise GPS.

Content:

- Search input.
- Map preview with pin.
- Chosen place name.
- Latitude/longitude display.
- Confirm action.

## UI Copy

Brand:

- `花园图鉴`
- `Garden Atlas`

Home:

- `探索植物之美，记录自然的每一刻。`
- `拍照识别植物`
- `拍下植物，生成专属图鉴`
- `封面植物`
- `轻扫查看今日图鉴`
- `图鉴全览`
- `查看所有图鉴`
- `我的收藏`
- `收藏的植物`

Generation:

- `正在生成植物图鉴`
- `正在整理植物轮廓`
- `生成标本构图`
- `绘制细节特写`
- `写入图鉴标签`
- `这通常需要几秒钟`

Result:

- `保存图鉴`
- `重新生成`
- `对比原图`
- `编辑信息`
- `AI 识别结果可编辑`

Gallery:

- `图鉴全览`
- `全部`
- `已识别`
- `未识别`
- `收藏`
- `筛选`
- `搜索植物`

Detail:

- `记录信息`
- `拍摄时间`
- `拍摄地点`
- `备注`
- `标签`
- `原图`
- `分享`
- `保存海报`

Location:

- `选择位置`
- `搜索地点`
- `已选择位置`
- `确认`

Permission copy:

- Camera: `允许访问相机，用于拍摄植物并生成图鉴。`
- Location: `允许记录位置，让你的植物记忆按地点归档。`
- Photos: `允许选择照片，用于生成植物图鉴。`

## Data Model

### PlantEntry

```ts
type PlantEntry = {
  id: string;
  originalImageUrl: string;
  generatedImageUrl: string;
  speciesName: string;
  commonName: string;
  identificationStatus: "identified" | "unidentified" | "edited";
  confidence: number | null;
  notes: string;
  latitude: number | null;
  longitude: number | null;
  locationName: string;
  weatherSummary: string | null;
  capturedAt: string;
  createdAt: string;
  updatedAt: string;
  styleMode: StyleMode;
  tags: string[];
  favorite: boolean;
  generationHistory: GenerationRecord[];
};
```

### StyleMode

```ts
type StyleMode =
  | "scientific_herbarium"
  | "vintage_botanical_book"
  | "minimal_japanese_field_guide"
  | "modern_editorial";
```

### GenerationRecord

```ts
type GenerationRecord = {
  id: string;
  entryId: string;
  status: "queued" | "processing" | "succeeded" | "failed";
  styleMode: StyleMode;
  prompt: string;
  revisedPrompt: string | null;
  outputImageUrl: string | null;
  errorCode: string | null;
  createdAt: string;
  completedAt: string | null;
};
```

## API Contracts

The first prototype uses mocked responses. The contracts below define the backend boundary for a later production service.

### Create Plant Entry

`POST /api/plant-entries`

Request:

```json
{
  "originalImageId": "upload_01JZ8EXAMPLE",
  "styleMode": "scientific_herbarium",
  "notes": "Found during a rainy afternoon walk.",
  "latitude": 30.2475,
  "longitude": 120.1215,
  "locationName": "杭州西湖"
}
```

Response:

```json
{
  "entry": {
    "id": "entry_01JZ8EXAMPLE",
    "generationStatus": "queued"
  }
}
```

### Start Specimen Generation

`POST /api/plant-entries/{entryId}/generations`

Request:

```json
{
  "styleMode": "scientific_herbarium",
  "includeDetailPanels": true,
  "includeLineDrawings": true,
  "language": "zh-CN"
}
```

Response:

```json
{
  "generation": {
    "id": "gen_01JZ8EXAMPLE",
    "status": "processing",
    "estimatedSeconds": 12
  }
}
```

### Get Generation

`GET /api/generations/{generationId}`

Response:

```json
{
  "generation": {
    "id": "gen_01JZ8EXAMPLE",
    "status": "succeeded",
    "outputImageUrl": "https://cdn.example.com/generated/camellia-card.jpg",
    "revisedPrompt": "Museum-style botanical atlas plate of Camellia japonica..."
  }
}
```

### Update Plant Entry

`PATCH /api/plant-entries/{entryId}`

Request:

```json
{
  "speciesName": "Camellia japonica",
  "commonName": "山茶",
  "notes": "庭院角落的一株山茶，花开洁白，香气淡雅。",
  "tags": ["庭院植物", "开花植物", "常绿灌木"],
  "favorite": true
}
```

Response:

```json
{
  "entry": {
    "id": "entry_01JZ8EXAMPLE",
    "updatedAt": "2026-05-12T07:00:00.000Z"
  }
}
```

### List Gallery Entries

`GET /api/plant-entries?filter=favorites&query=camellia&cursor=entry_01JZ8EXAMPLE`

Response:

```json
{
  "items": [
    {
      "id": "entry_01JZ8EXAMPLE",
      "thumbnailUrl": "https://cdn.example.com/generated/camellia-thumb.jpg",
      "commonName": "山茶",
      "speciesName": "Camellia japonica",
      "capturedAt": "2026-05-20T10:30:00.000Z",
      "locationName": "杭州"
    }
  ],
  "nextCursor": null
}
```

### OpenAI Image Integration Boundary

The production backend should keep OpenAI calls server-side. The recommended production path is to use the Responses API with the `image_generation` tool when multi-step or iterative image generation is needed, and the Image API when a single image generation/edit request is enough. OpenAI's current image generation guide says both APIs support GPT Image models, output customization, and image generation/editing, while the Responses API is better for conversational or multi-step image workflows.

For this product, use a backend adapter with this interface:

```ts
type GenerateSpecimenCardInput = {
  sourceImageUrl: string;
  styleMode: StyleMode;
  language: "zh-CN" | "en-US";
  commonNameHint?: string;
  speciesNameHint?: string;
  locationName?: string;
};

type GenerateSpecimenCardOutput = {
  generatedImageUrl: string;
  revisedPrompt: string | null;
  speciesName: string | null;
  commonName: string | null;
  confidence: number | null;
};
```

Official references:

- OpenAI image generation guide: https://platform.openai.com/docs/guides/image-generation
- OpenAI image generation tool guide: https://platform.openai.com/docs/guides/tools-image-generation
- OpenAI Images API reference: https://platform.openai.com/docs/api-reference/images/create

## Error Handling

User-facing states:

- Upload failed: `照片上传失败，请重试。`
- Poor image quality: `植物细节不够清晰，可以换一张更近的照片。`
- Generation failed: `图鉴生成失败，请稍后再试。`
- Location unavailable: `暂时无法获取位置，你也可以手动选择地点。`
- Identification uncertain: `AI 识别结果不确定，你可以稍后编辑名称。`

System behavior:

- Keep the original photo even if generation fails.
- Preserve user notes and location independently from AI output.
- Allow users to save an unidentified entry.
- Store generation failures in `GenerationRecord` for retry/history.

## Testing Strategy

Prototype tests:

- Render all primary routes.
- Verify mock generation progresses to result.
- Verify gallery filters alter visible entries.
- Verify detail edit state updates local data.
- Verify comparison slider moves without layout shifts.
- Verify responsive mobile viewport and desktop centered phone frame.

Native scaffold tests:

- Route smoke tests.
- Type checks for shared model shapes.
- Mock service tests for entry creation and generation status.

Manual visual QA:

- Open the web prototype at mobile width and desktop width.
- Confirm text fits in controls.
- Confirm palette is not one-note and remains legible.
- Confirm no nested card layout or overlapping content.

## Spec Self-Review

- No deferred item is required for the first prototype.
- API contracts are explicit and mockable.
- The OpenAI integration is intentionally server-side and contract-defined.
- The web prototype is the design source of truth; Expo mirrors structure without needing production device capabilities in the first pass.
- The scope is one implementation plan because all deliverables support a single MVP demo.
