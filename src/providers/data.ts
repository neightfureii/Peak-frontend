import { Sport } from "@/types";
import { BaseRecord, DataProvider, GetListParams, GetListResponse } from "@refinedev/core";

export const mockSportsData: Sport[] = [
  {
    id: 1,
    code: "FTB",
    name: "Football",
    category: "Ball Sports",
    description: "Team sport played with a spherical ball where two teams aim to score goals.",
    created_at: new Date().toISOString(),
  },
  {
    id: 2,
    code: "BKT",
    name: "Basketball",
    category: "Ball Sports",
    description: "Fast-paced team sport where players shoot a ball through hoops to score points.",
    created_at: new Date().toISOString(),
  },
  {
    id: 3,
    code: "TEN",
    name: "Tennis",
    category: "Racket Sports",
    description: "Individual or doubles sport played on a court using rackets to hit a ball.",
    created_at: new Date().toISOString(),
  },
  {
    id: 4,
    code: "VLB",
    name: "Volleyball",
    category: "Ball Sports",
    description: "Team sport where players hit a ball over a net to score points.",
    created_at: new Date().toISOString(),
  },
  {
    id: 5,
    code: "SWM",
    name: "Swimming",
    category: "Water Sports",
    description: "Competitive sport involving racing through water using various strokes.",
    created_at: new Date().toISOString(),
  },
  {
    id: 6,
    code: "RUN",
    name: "Running",
    category: "Track & Field",
    description: "Individual sport focused on racing at various distances on a track or road.",
    created_at: new Date().toISOString(),
  },
  {
    id: 7,
    code: "CYC",
    name: "Cycling",
    category: "Endurance Sports",
    description: "Sport involving racing on bicycles across various terrains and distances.",
    created_at: new Date().toISOString(),
  },
  {
    id: 8,
    code: "BDM",
    name: "Badminton",
    category: "Racket Sports",
    description: "Fast racket sport played on a court where players hit a shuttlecock over a net.",
    created_at: new Date().toISOString(),
  },
];

export const dataProvider: DataProvider = {
  getList: async <TData extends BaseRecord = BaseRecord>({ resource }: GetListParams): Promise<GetListResponse<TData>> => {
    if (resource !== "sports") return { data : [] as TData[], total: 0 };
    
    return {
      data: mockSportsData as unknown as TData[],
      total: mockSportsData.length,
    }
  },

  getOne: async () => {throw new Error("Method not implemented in mock.")},
  create: async () => {throw new Error("Method not implemented in mock.")},
  update: async () => {throw new Error("Method not implemented in mock.")},
  deleteOne: async () => {throw new Error("Method not implemented in mock.")},

  getApiUrl: () => "",
}