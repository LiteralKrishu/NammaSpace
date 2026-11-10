/**
 * NAMMA SPACE — Scene Configuration Registry
 *
 * Only real reconstructions are registered here, so the viewer lists only rendered rooms.
 * Synthetic test scenes live in `fixtureScenes.js` and are used by the test suite only.
 *
 * Architectural Separation Note:
 * - `mode: 'demo'` uses procedural Three.js geometry (`src/viewer/createScene.js`) strictly as a
 *   baseline test environment for controls, collision physics, and Round 2 wayfinding hooks.
 *   It is NEVER misrepresented as AI-reconstructed output.
 * - `mode: 'glb'` loads external polygon mesh reconstructions (.glb / .gltf) via Three.js GLTFLoader.
 * - `mode: 'splat'` loads standard 32-byte 3D Gaussian Splat assets (.splat) via the Gaussian Splat
 *   pipeline with a separate proxy collision layout (since splats are volumetric Gaussians without mesh faces).
 */

export const DEFAULT_STANDING_HEIGHT = 1.68; // world units; metric only in calibrated metric scenes
export const PLAYER_RADIUS = 0.36; // world-unit horizontal collision cylinder radius

export const SCENES = {
  'nammaspace-classroom': {
    id: 'nammaspace-classroom',
    name: 'NammaSpace Classroom — Gaussian Splat Scan',
    shortLabel: 'Classroom Scan (.splat)',
    mode: 'splat',
    sceneType: '3D Gaussian Splatting (.splat)',
    reconstructionStatus:
      'Reconstructed from on-site footage: COLMAP 4.2 poses (597/599 frames, 0.62 px reprojection) + Brush 0.3 splat training',
    isReconstructed: true,
    assetUrl: '/scenes/nammaspace-classroom.splat',
    dimensionsLabel: '8.2m × 13.7m × 2.85m',
    description:
      'Tiered classroom with a raised stage and projector screen at the front, two desk blocks split by a centre aisle, and the BUILD mural above the stepped seating at the back. Captured with 9 handheld 4K clips and 46 stills.',
    calibration: {
      captureSource:
        'nammaspace-videos&photos: C5304–C5312.MP4 (4K, sampled at 2 fps → 553 frames) + DSC01816–DSC01861.JPG (46 stills)',
      originDescription:
        'Centre of the room footprint on the main (lower) floor; -Z points to the stage/projector screen, +Z to the BUILD mural tiers.',
      upAxis: 'Y',
      metersPerAssetUnit: 1,
      // Scale is set from the desk-top plane (0.70 COLMAP units above the floor) using a standard
      // 0.75 m desk height. It is an assumed reference, not a tape measurement; cross-checks:
      // camera height ≈ 1.35 m, ceiling ≈ 2.85 m. Tape-measure one desk to confirm.
      referenceDistanceMeters: 0.75,
      referenceDistanceAssetUnits: 0.7,
      referenceIsAssumed: true
    },
    spawn: {
      // Back of the centre aisle, facing the stage.
      position: [0.3, DEFAULT_STANDING_HEIGHT, 4.47],
      yaw: 0,
      pitch: -0.08
    },
    roomBounds: {
      minX: -4.05,
      maxX: 4.05,
      minZ: -6.85,
      maxZ: 6.85,
      floorY: 0,
      ceilingY: 2.85
    },
    colliders: [
      {
        id: 'desks-left',
        label: 'Left Desk & Chair Block',
        minX: -2.95,
        maxX: -0.25,
        minY: 0,
        maxY: 0.95,
        minZ: -3.5,
        maxZ: 4.0
      },
      {
        id: 'desks-right',
        label: 'Right Desk & Chair Block',
        minX: 0.85,
        maxX: 2.95,
        minY: 0,
        maxY: 0.95,
        minZ: -3.5,
        maxZ: 4.0
      },
      {
        id: 'stage',
        label: 'Raised Stage (≈0.3 m)',
        minX: -4.05,
        maxX: 4.05,
        minY: 0,
        maxY: 0.35,
        minZ: -6.85,
        maxZ: -5.15
      },
      {
        id: 'tiered-seating',
        label: 'Stepped Seating Tiers',
        minX: -4.05,
        maxX: 4.05,
        minY: 0,
        maxY: 1.2,
        minZ: 4.95,
        maxZ: 6.85
      }
    ],
    pois: [
      {
        id: 'poi-stage',
        name: 'Stage & Projector Screen',
        category: 'Teaching',
        description: 'Raised lecture stage with the projector screen, podium and whiteboard.',
        position: [0, 1.6, -6.2],
        waypoint: [0.3, -4.45],
        lookAt: [0, 1.5, -6.8]
      },
      {
        id: 'poi-build-wall',
        name: 'BUILD Mural & Stepped Seating',
        category: 'Seating',
        description: 'Tiered steps with floor cushions below the BUILD wall graphic.',
        position: [0, 1.6, 5.8],
        waypoint: [-3.5, 4.45],
        lookAt: [0, 1.4, 6.6]
      },
      {
        id: 'poi-desks-left',
        name: 'Left Desk Block',
        category: 'Workspace',
        description: 'Rows of white trapezoid desks with grey shell chairs, left of the centre aisle.',
        position: [-1.6, 1.2, 0],
        waypoint: [-3.5, 0],
        lookAt: [-1.6, 0.75, 0]
      },
      {
        id: 'poi-desks-right',
        name: 'Right Desk Block',
        category: 'Workspace',
        description: 'Rows of white trapezoid desks with grey shell chairs, right of the centre aisle.',
        position: [1.9, 1.2, 0],
        waypoint: [3.5, 0],
        lookAt: [1.9, 0.75, 0]
      }
    ]
  },
  'classroom-c5307-single-video': {
    id: 'classroom-c5307-single-video',
    name: 'C5307 — Best room (VGGT, clean frames)',
    shortLabel: 'C5307 Best Room',
    mode: 'splat',
    sceneType: '3D Gaussian Splatting (.splat)',
    reconstructionStatus: 'C5307.MP4 only; local VGGT-assisted reconstruction; relative scale',
    navigationStatus: 'pilot',
    roomBoundsKnown: false,
    showCalibrationStage: false,
    isReconstructed: true,
    eyeHeight: 1,
    cameraFov: 57.2,
    assetUrl: '/scenes/classroom-c5307-single-video.splat',
    dimensionsLabel: 'Room dimensions unknown',
    description:
      'This model uses 149 person-free training frames from one 30.24-second Sony video. All 242 sampled frames registered in one camera route. The stage, seating, floor, walls, and ceiling are visible. Some side furniture softens from weakly recorded viewpoints. Walking limits are visual estimates.',
    calibration: {
      captureSource: 'assets/C5307.MP4, 30.24 seconds; 242 registered frames at 8 fps; 149 person-free training frames',
      upAxis: 'Y',
      scaleType: 'relative',
      sceneUnitsPerAssetUnit: 1,
      originDescription: 'Walking floor fitted to the one-video Gaussian model',
      referenceObject: 'Median camera clearance above the fitted walking floor',
      referenceHeightSceneUnits: 1
    },
    spawn: {
      position: [0.07, 1, 2.46],
      yaw: 0.105,
      pitch: -0.079
    },
    roomBounds: {
      minX: -2,
      maxX: 4,
      minZ: 0.3,
      maxZ: 8.4,
      floorY: 0,
      ceilingY: 2.5
    },
    colliders: [],
    pois: []
  },
  'classroom-c5307-colmap-clean-20k': {
    id: 'classroom-c5307-colmap-clean-20k',
    name: 'C5307 — Clean frames, COLMAP only',
    shortLabel: 'C5307 COLMAP Trial',
    mode: 'splat',
    sceneType: '3D Gaussian Splatting (.splat)',
    reconstructionStatus: 'C5307.MP4 only; 20,000 local GPU steps; no VGGT initialization',
    navigationStatus: 'pilot',
    roomBoundsKnown: false,
    showCalibrationStage: false,
    isReconstructed: true,
    eyeHeight: 1,
    cameraFov: 57.2,
    assetUrl: '/scenes/classroom-c5307-colmap-clean-20k.splat',
    dimensionsLabel: 'Room dimensions unknown',
    description: 'Comparison run trained on 146 person-free frames. COLMAP sparse points initialized the model. It scored 32.98 dB PSNR and 0.950 SSIM on 19 nearby held-out frames. Some side furniture remains soft.',
    calibration: {
      captureSource: 'assets/C5307.MP4 only; 146 person-free training frames',
      upAxis: 'Y',
      scaleType: 'relative',
      sceneUnitsPerAssetUnit: 1,
      originDescription: 'Walking floor fitted to the same C5307 video',
      referenceObject: 'Median camera clearance above the fitted walking floor',
      referenceHeightSceneUnits: 1
    },
    spawn: { position: [0.07, 1, 2.46], yaw: 0.105, pitch: -0.079 },
    roomBounds: { minX: -2, maxX: 4, minZ: 0.3, maxZ: 8.4, floorY: 0, ceilingY: 2.5 },
    colliders: [],
    pois: []
  },
  'classroom-c5307-vggt-filled-20k': {
    id: 'classroom-c5307-vggt-filled-20k',
    name: 'C5307 — VGGT, filled people trial',
    shortLabel: 'C5307 Filled Trial',
    mode: 'splat',
    sceneType: '3D Gaussian Splatting (.splat)',
    reconstructionStatus: 'C5307.MP4 only; 20,000 local GPU steps; masked people filled',
    navigationStatus: 'pilot',
    roomBoundsKnown: false,
    showCalibrationStage: false,
    isReconstructed: true,
    eyeHeight: 1,
    cameraFov: 57.2,
    assetUrl: '/scenes/classroom-c5307-vggt-filled-20k.splat',
    dimensionsLabel: 'Room dimensions unknown',
    description: 'Comparison run trained on 242 video frames after masking and filling people. VGGT depth initialized the model. It scored 30.76 dB PSNR and 0.938 SSIM on 31 nearby held-out frames. The filled areas smear more than the selected clean-frame model.',
    calibration: {
      captureSource: 'assets/C5307.MP4 only; 242 training frames with person masks and fills',
      upAxis: 'Y',
      scaleType: 'relative',
      sceneUnitsPerAssetUnit: 1,
      originDescription: 'Walking floor fitted to the same C5307 video',
      referenceObject: 'Median camera clearance above the fitted walking floor',
      referenceHeightSceneUnits: 1
    },
    spawn: { position: [0.07, 1, 2.46], yaw: 0.105, pitch: -0.079 },
    roomBounds: { minX: -2, maxX: 4, minZ: 0.3, maxZ: 8.4, floorY: 0, ceilingY: 2.5 },
    colliders: [],
    pois: []
  },
  'classroom-c5307-first15-baseline': {
    id: 'classroom-c5307-first15-baseline',
    name: 'C5307 — Earlier 15-second model',
    shortLabel: 'C5307 Earlier Model',
    mode: 'splat',
    sceneType: '3D Gaussian Splatting (.splat)',
    reconstructionStatus: 'C5307.MP4 only; earlier first-15-second reconstruction',
    navigationStatus: 'pilot',
    roomBoundsKnown: false,
    showCalibrationStage: false,
    isReconstructed: true,
    eyeHeight: 1,
    assetUrl: '/scenes/classroom-c5307-first15-baseline.splat',
    dimensionsLabel: 'Room dimensions unknown',
    description: 'Earlier model built from 120 frames sampled from the first 15 seconds of C5307.MP4. It preserves the original scene for comparison. Side walls and furniture have visible ghosting.',
    calibration: {
      captureSource: 'assets/C5307.MP4, first 15 seconds; 120 registered frames at 8 fps',
      upAxis: 'Y',
      scaleType: 'relative',
      sceneUnitsPerAssetUnit: 1,
      originDescription: 'Walking floor fitted to the earlier C5307 Gaussian model',
      referenceObject: 'Median camera clearance above the fitted walking floor',
      referenceHeightSceneUnits: 1
    },
    spawn: { position: [0.025, 1, 2.46], yaw: 0, pitch: -0.04 },
    roomBounds: { minX: -1.6, maxX: 1.6, minZ: 0.6, maxZ: 4.2, floorY: 0, ceilingY: 2.5 },
    colliders: [],
    pois: []
  },
  'classroom-c5306-single-video': {
    id: 'classroom-c5306-single-video',
    name: 'Captured Classroom — C5306 Video',
    shortLabel: 'C5306 One-Video Room',
    mode: 'splat',
    sceneType: '3D Gaussian Splatting (.splat)',
    reconstructionStatus: 'Reconstructed only from C5306.MP4; relative scale; room dimensions unknown',
    navigationStatus: 'pilot',
    roomBoundsKnown: false,
    showCalibrationStage: false,
    isReconstructed: true,
    eyeHeight: 1.08,
    assetUrl: '/scenes/classroom-c5306-single-video.splat',
    dimensionsLabel: 'Room dimensions unknown',
    description:
      'This model uses 198 frames from one Sony video. It shows the floor, stage, and seating. The camera points down for much of the clip, so the upper room has limited coverage. Scale and navigation limits are visual estimates.',
    calibration: {
      captureSource: 'assets/C5306.MP4, 49.44 seconds; 198 registered frames at 4 fps',
      upAxis: 'Y',
      scaleType: 'relative',
      sceneUnitsPerAssetUnit: 1,
      originDescription: 'Fitted floor near the front turn of the video camera route',
      referenceObject: 'Median camera clearance above the fitted video floor',
      referenceHeightSceneUnits: 1
    },
    spawn: {
      position: [-1.42, 1.08, 2.08],
      yaw: -0.401,
      pitch: -0.533
    },
    roomBounds: {
      minX: -3.5,
      maxX: 7.2,
      minZ: -0.5,
      maxZ: 9.5,
      floorY: 0,
      ceilingY: 3.5
    },
    colliders: [],
    pois: [{
      id: 'c5306-front',
      name: 'Captured Front Aisle',
      category: 'Classroom',
      description: 'A recorded camera position beside the front stage.',
      position: [0, 1, 0],
      waypoint: [-0.7, 0.8],
      lookAt: [0, 1, 0]
    }]
  },
  'classroom-c5305-one-video': {
    id: 'classroom-c5305-one-video',
    name: 'C5305 — Earlier ceiling pass',
    shortLabel: 'C5305 Ceiling Trial',
    mode: 'splat',
    sceneType: '3D Gaussian Splatting (.splat)',
    reconstructionStatus: 'C5305.MP4 only; 7,000-step ceiling-heavy trial; relative scale',
    navigationStatus: 'pilot',
    roomBoundsKnown: false,
    showCalibrationStage: false,
    isReconstructed: true,
    eyeHeight: 0.91,
    cameraFov: 57.8,
    assetUrl: '/scenes/classroom-c5305-one-video.splat',
    dimensionsLabel: 'Room dimensions unknown',
    description: 'Earlier one-video trial with 83 registered frames. The camera spent much of the pass on the ceiling and upper walls. Floor and seating coverage are limited.',
    calibration: {
      captureSource: 'assets/C5305.MP4 only; 83 registered frames at 2 fps',
      upAxis: 'Y',
      scaleType: 'relative',
      sceneUnitsPerAssetUnit: 1,
      originDescription: 'Floor fitted from C5305 video points',
      referenceObject: 'Projector-screen border marked in four frames from the same video',
      referenceHeightSceneUnits: 2
    },
    spawn: { position: [-0.59, 0.91, 7.12], yaw: 0.05, pitch: 0.28 },
    roomBounds: { minX: -2, maxX: 14, minZ: 0, maxZ: 13, floorY: 0, ceilingY: 3.2 },
    colliders: [],
    pois: []
  },
  'classroom-single-video': {
    id: 'classroom-single-video',
    name: 'C5304 — Earlier one-video model',
    shortLabel: 'C5304 One-Video Room',
    mode: 'splat',
    sceneType: '3D Gaussian Splatting (.splat)',
    reconstructionStatus: 'Reconstructed only from C5304.MP4; relative scale; room dimensions unknown',
    navigationStatus: 'pilot',
    roomBoundsKnown: false,
    showCalibrationStage: false,
    isReconstructed: true,
    eyeHeight: 1.47,
    assetUrl: '/scenes/classroom-single-video.splat',
    dimensionsLabel: 'Room dimensions unknown',
    description:
      'This model uses 99 registered frames from one continuous Sony video. The screen and floor set an arbitrary scene scale. Navigation limits and furniture boxes are visual estimates, not measured room dimensions.',
    calibration: {
      captureSource: 'assets/C5304.MP4, first 55 seconds; 99 valid frames at 2 fps',
      upAxis: 'Y',
      scaleType: 'relative',
      sceneUnitsPerAssetUnit: 1,
      originDescription: 'Fitted floor below the visible projector screen',
      referenceObject: 'Outer projector-screen border in three frames of the same video',
      referenceHeightSceneUnits: 2
    },
    spawn: {
      position: [-5.03, 1.47, 8.91],
      yaw: -0.012,
      pitch: -0.09
    },
    // These visual estimates are used for the walking preview only.
    roomBounds: {
      minX: -6.2,
      maxX: 4.9,
      minZ: -0.8,
      maxZ: 15.6,
      floorY: 0,
      ceilingY: 4.5
    },
    colliders: [
      { id: 'video-stage', label: 'Front stage', minX: -2.8, maxX: 2.8, minY: 0, maxY: 0.65, minZ: -0.3, maxZ: 1.35 },
      { id: 'video-stage-steps', label: 'Stage steps', minX: -3.0, maxX: 3.0, minY: 0, maxY: 0.35, minZ: 1.35, maxZ: 1.95 },
      { id: 'video-left-front', label: 'Left front tables', minX: -3.9, maxX: -0.8, minY: 0, maxY: 0.95, minZ: 2.8, maxZ: 4.0 },
      { id: 'video-right-front', label: 'Right front tables', minX: 0.8, maxX: 2.9, minY: 0, maxY: 0.95, minZ: 2.8, maxZ: 4.0 },
      { id: 'video-left-middle-1', label: 'Left middle tables', minX: -3.9, maxX: -0.8, minY: 0, maxY: 0.95, minZ: 4.5, maxZ: 5.7 },
      { id: 'video-right-middle-1', label: 'Right middle tables', minX: 0.8, maxX: 2.9, minY: 0, maxY: 0.95, minZ: 4.5, maxZ: 5.7 },
      { id: 'video-left-middle-2', label: 'Left middle tables', minX: -3.9, maxX: -0.8, minY: 0, maxY: 0.95, minZ: 6.2, maxZ: 7.4 },
      { id: 'video-right-middle-2', label: 'Right middle tables', minX: 0.8, maxX: 2.9, minY: 0, maxY: 0.95, minZ: 6.2, maxZ: 7.4 },
      { id: 'video-left-middle-3', label: 'Left middle tables', minX: -3.9, maxX: -0.8, minY: 0, maxY: 0.95, minZ: 7.9, maxZ: 9.1 },
      { id: 'video-right-middle-3', label: 'Right middle tables', minX: 0.8, maxX: 2.9, minY: 0, maxY: 0.95, minZ: 7.9, maxZ: 9.1 },
      { id: 'video-left-rear', label: 'Left rear tables', minX: -3.9, maxX: -0.8, minY: 0, maxY: 0.95, minZ: 9.6, maxZ: 11.5 },
      { id: 'video-right-rear', label: 'Right rear tables', minX: 0.8, maxX: 2.9, minY: 0, maxY: 0.95, minZ: 9.6, maxZ: 11.5 }
    ],
    pois: [
      {
        id: 'video-screen',
        name: 'Projector Screen',
        category: 'Classroom',
        description: 'Visible screen used for relative orientation. Its physical size was not measured for this model.',
        position: [0, 1.8, 0],
        waypoint: [0, 2.5],
        lookAt: [0, 1.8, 0]
      },
      {
        id: 'video-rear',
        name: 'Rear Aisle',
        category: 'Classroom',
        description: 'A view toward the rear of the classroom.',
        position: [0, 1.5, 13.5],
        waypoint: [0, 12.4],
        lookAt: [0, 1.5, 13.5]
      }
    ]
  },
  'whatsapp-corridor-20261102': {
    id: 'whatsapp-corridor-20261102',
    name: 'WhatsApp video — Corridor & stair lobby',
    shortLabel: 'New corridor capture',
    mode: 'splat',
    sceneType: '3D Gaussian Splatting (.splat)',
    reconstructionStatus: 'One WhatsApp video; trained locally with VGGT; person regions estimated from the same video; relative scale',
    navigationStatus: 'visual-inspection-only',
    roomBoundsKnown: false,
    showCalibrationStage: false,
    isReconstructed: true,
    eyeHeight: 1,
    cameraFov: 38,
    assetUrl: '/scenes/whatsapp-corridor-20261102.splat',
    dimensionsLabel: 'Room dimensions unknown',
    description:
      'This corridor and stair lobby come from the supplied 61-second WhatsApp video. The floor is aligned from the recording. Detail softens away from the recorded path and around surfaces hidden by the seated person. Walking limits are estimates; stair and furniture collisions are unverified.',
    calibration: {
      captureSource: 'assets/WhatsApp Video 2026-11-02 at 00.25.30.mp4; 61.11 seconds; 361 registered frames; 344 selected frames with same-video person fills',
      upAxis: 'Y',
      scaleType: 'relative',
      sceneUnitsPerAssetUnit: 1,
      originDescription: 'Walking floor fitted from the video below the frame_0229.jpg camera position',
      referenceObject: 'Median camera clearance above the fitted floor',
      referenceHeightSceneUnits: 1
    },
    spawn: { position: [0.0333, 1, 0.0005], yaw: -0.67797, pitch: -0.22283 },
    roomBounds: { minX: -1.3, maxX: 1.3, minZ: -1.8, maxZ: 18, floorY: 0, ceilingY: 3 },
    colliders: [],
    pois: []
  },
  'classroom-pilot': {
    id: 'classroom-pilot',
    name: 'Captured Classroom — Screen-Scaled Pilot',
    shortLabel: 'Real Classroom Capture',
    mode: 'splat',
    sceneType: '3D Gaussian Splatting (.splat)',
    reconstructionStatus: 'Real Sony camera capture; room dimensions unknown; visual ghosting remains',
    navigationStatus: 'pilot',
    roomBoundsKnown: false,
    showCalibrationStage: false,
    isReconstructed: true,
    eyeHeight: 1.29,
    assetUrl: '/scenes/classroom-metric.splat',
    dimensionsLabel: 'Room dimensions unknown',
    description:
      'The current splat uses 275 frames from the supplied Sony videos. The still photos are visual references. The measured projector screen sets an approximate scale. Room limits and furniture collision boxes are estimates.',
    calibration: {
      captureSource: 'Sony ILCE-7SM3 video frames from the supplied assets folder',
      upAxis: 'Y',
      metersPerAssetUnit: 1,
      originDescription: 'Estimated floor below the projector screen bottom centre',
      referenceDistanceMeters: 1.825,
      referenceDistanceAssetUnits: 1.825
    },
    spawn: {
      position: [0.72, 1.29, 5.82],
      yaw: 0.248,
      pitch: -0.171
    },
    // These values limit pilot navigation. They are not measured room dimensions.
    roomBounds: {
      minX: -4.2,
      maxX: 4.4,
      minZ: -0.45,
      maxZ: 12.2,
      floorY: 0,
      ceilingY: 3.4
    },
    colliders: [
      { id: 'stage-upper', label: 'Raised stage', minX: -2.7, maxX: 2.7, minY: 0, maxY: 0.6, minZ: -0.35, maxZ: 1.65 },
      { id: 'stage-steps', label: 'Stage steps', minX: -3.2, maxX: 3.2, minY: 0, maxY: 0.38, minZ: 1.65, maxZ: 2.25 },
      { id: 'whiteboard', label: 'Left whiteboard', minX: -4.05, maxX: -3.4, minY: 0, maxY: 2.1, minZ: 0.7, maxZ: 2.25 },
      { id: 'front-cabinet', label: 'Right cabinet', minX: 3.25, maxX: 4.2, minY: 0, maxY: 1.1, minZ: 0.3, maxZ: 2.25 },
      { id: 'tables-left-1', label: 'Left front tables', minX: -3.55, maxX: -0.65, minY: 0, maxY: 0.95, minZ: 2.8, maxZ: 3.8 },
      { id: 'tables-right-1', label: 'Right front tables', minX: 1.5, maxX: 4.05, minY: 0, maxY: 0.95, minZ: 2.8, maxZ: 3.8 },
      { id: 'tables-left-2', label: 'Left middle tables', minX: -3.55, maxX: -0.65, minY: 0, maxY: 0.95, minZ: 4.3, maxZ: 5.2 },
      { id: 'tables-right-2', label: 'Right middle tables', minX: 1.5, maxX: 4.05, minY: 0, maxY: 0.95, minZ: 4.3, maxZ: 5.2 },
      { id: 'tables-left-3', label: 'Left middle tables', minX: -3.55, maxX: -0.65, minY: 0, maxY: 0.95, minZ: 5.8, maxZ: 6.7 },
      { id: 'tables-right-3', label: 'Right middle tables', minX: 1.5, maxX: 4.05, minY: 0, maxY: 0.95, minZ: 5.8, maxZ: 6.7 },
      { id: 'tables-left-4', label: 'Left rear tables', minX: -3.55, maxX: -0.65, minY: 0, maxY: 0.95, minZ: 7.3, maxZ: 8.2 },
      { id: 'tables-right-4', label: 'Right rear tables', minX: 1.5, maxX: 4.05, minY: 0, maxY: 0.95, minZ: 7.3, maxZ: 8.2 },
      { id: 'rear-benches-left', label: 'Left rear seating', minX: -3.55, maxX: -0.65, minY: 0, maxY: 1.2, minZ: 8.8, maxZ: 11.5 },
      { id: 'rear-benches-right', label: 'Right rear seating', minX: 1.5, maxX: 4.05, minY: 0, maxY: 1.2, minZ: 8.8, maxZ: 11.5 }
    ],
    pois: [
      {
        id: 'pilot-projector',
        name: 'Measured Projector Screen',
        category: 'Calibration',
        description: 'The screen is 1.825 m high and approximately 2.40 m wide. It sets the scene scale.',
        position: [0, 1.75, 0.05],
        waypoint: [0.65, 2.8],
        lookAt: [0, 1.75, 0.05]
      },
      {
        id: 'pilot-rear-seating',
        name: 'Rear Seating',
        category: 'Classroom',
        description: 'View the tiered rear seating from the clear centre aisle.',
        position: [-2.5, 1.1, 10.2],
        waypoint: [0.55, 10.0],
        lookAt: [-2.5, 1.1, 10.2]
      }
    ]
  },
  'room-01-reconstruction': {
    id: 'room-01-reconstruction',
    name: 'Room 01 — Sony 3D Reconstruction',
    shortLabel: 'Room 01 (.glb)',
    mode: 'glb',
    sceneType: 'COLMAP dense mesh (.glb)',
    reconstructionStatus: 'Sony camera reconstruction; scale and floor alignment unverified',
    navigationStatus: 'visual-inspection-only',
    eyeHeight: 1.68,
    calibration: {
      captureSource: 'Sony A7S III room footage; provisional alignment',
      upAxis: 'Y',
      originDescription: 'Provisional origin; floor and orientation not physically calibrated',
      scaleType: 'relative',
      sceneUnitsPerAssetUnit: 1,
      referenceObject: 'Unmeasured room geometry; relative scale only',
      referenceHeightSceneUnits: 1
    },
    isReconstructed: true,
    assetUrl: '/models/room-01.glb',
    dimensionsLabel: 'Approx. 10.32 × 7.91 × 11.66 reconstruction units',
    description:
      'Dense mesh reconstructed from Sony camera footage using COLMAP. Visual inspection only; metric scale, floor alignment, orientation, spawn, and collision boundaries remain uncalibrated.',
    spawn: {
      position: [1.4, 1.68, 0.47],
      yaw: 0,
      pitch: -0.05
    },
    roomBounds: {
      minX: -3.75,
      maxX: 6.57,
      minZ: -5.36,
      maxZ: 6.30,
      floorY: 0,
      ceilingY: 8.0
    },
    colliders: [],
    pois: []
  }
};

export const DEFAULT_SCENE_ID = 'nammaspace-classroom';

export function getSceneConfig(sceneId) {
  return SCENES[sceneId] || SCENES[DEFAULT_SCENE_ID];
}

export function getSceneList() {
  return Object.values(SCENES);
}
