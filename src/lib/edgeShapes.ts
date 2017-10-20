export class EdgeShapes {
    public static readonly haystack = 'haystack'
    public static readonly bezier = 'bezier'
    public static readonly unbundledBezier = 'unbundled-bezier'
    public static readonly segments = 'segments'
    public static readonly shapes = [
        EdgeShapes.haystack,
        EdgeShapes.bezier,
        EdgeShapes.unbundledBezier,
        EdgeShapes.segments
    ]
}
export class EdgeLineStyle {
    public static readonly solid = 'solid'
    public static readonly dotted = 'dotted'
    public static readonly dashed = 'dashed'
    public static readonly styles = [
        EdgeLineStyle.solid,
        EdgeLineStyle.dotted,
        EdgeLineStyle.dashed
    ]
}