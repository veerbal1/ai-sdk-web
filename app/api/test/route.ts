import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";

export const GET = async () => {
    try {
        // Fetch the image from the FastAPI endpoint
        // const response = await fetch("https://rdkit-fastapi.onrender.com/ritonavir-scaffold");
        const response = await fetch("http://localhost:8000/generate-molecules-image", {
            method: "POST",
            body: JSON.stringify({
                smiles: ["CCO", "CC(=O)O", "c1ccccc1"],
                legends: ["Ethanol", "Acetic Acid", "Benzene"],
                mols_per_row: 3,
                sub_img_size: 300,
            }),
            headers: {
                "Content-Type": "application/json",
            },
        });
        
        if (!response.ok) {
            throw new Error(`Failed to fetch image: ${response.status}`);
        }
        
        const imageBuffer = await response.arrayBuffer();
        
        // Return the image directly with proper headers
        return new NextResponse(imageBuffer, {
            status: 200,
            headers: {
                'Content-Type': 'image/png',
                'Content-Disposition': 'inline; filename=ritonavir_scaffold.png',
                'Cache-Control': 'public, max-age=3600', // Cache for 1 hour
            },
        });
    } catch (error) {
        console.error('Error fetching molecule image:', error);
        return NextResponse.json(
            { error: 'Failed to fetch molecule image' },
            { status: 500 }
        );
    }
};