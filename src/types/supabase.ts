import { ContentData } from "./content";
import { PartialExcept } from "./generics";

export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[];

export type Content = {
  featured_image_url: string | null;
  content: ContentData | ContentData[] | null;
  created_at: string;
  description: string[] | null;
  date: string | null;
  icon_url: string | null;
  id: string;
  modified_at: string | null;
  name: string;
  role: string | null;
  status: Database["public"]["Enums"]["content_status_enum"] | null;
  type: Database["public"]["Enums"]["content_type_enum"] | null;
  is_featured: boolean;
  about_id: string;
};

export type Service = {
  id: string;
  name: string;
  description: string;
  icon_url: string;
  created_at: string;
  modified_at: string | null;
  about_id: string;
};

export type Technology = {
  id: string;
  name: string;
  icon_url: string;
  link: string | null;
  category: Database["public"]["Enums"]["tech_category_enum"];
  is_core: boolean;
  created_at: string;
  modified_at: string | null;
  about_id: string;
};

export type About = {
  id: string;
  overview: string;
  short_description: string;
  early_life: string;
  goals: string;
  created_at: string;
  modified_at: string | null;
};

export type Address = {
  about_id: string;
  address: string;
  created_at: string;
  id: string;
  modified_at: string | null;
  type: string;
};

export type Link = {
  about_id: string;
  link: string;
  created_at: string;
  id: string;
  modified_at: string | null;
  type: string;
};

// Supabase generated types

export type Database = {
  graphql_public: {
    Tables: {
      [_ in never]: never;
    };
    Views: {
      [_ in never]: never;
    };
    Functions: {
      graphql: {
        Args: {
          operationName?: string;
          query?: string;
          variables?: Json;
          extensions?: Json;
        };
        Returns: Json;
      };
    };
    Enums: {
      [_ in never]: never;
    };
    CompositeTypes: {
      [_ in never]: never;
    };
  };
  public: {
    Tables: {
      content: {
        Row: Content;
        Insert: PartialExcept<Content, "name" | "about_id">;
        Update: Partial<Content>;
        Relationships: [
          {
            foreignKeyName: "content_about_id_fkey";
            columns: ["about_id"];
            isOneToOne: false;
            referencedRelation: "about";
            referencedColumns: ["id"];
          }
        ];
      };
      service: {
        Row: Service;
        Insert: PartialExcept<
          Service,
          "name" | "description" | "icon_url" | "about_id"
        >;
        Update: Partial<Service>;
        Relationships: [
          {
            foreignKeyName: "service_about_id_fkey";
            columns: ["about_id"];
            isOneToOne: false;
            referencedRelation: "about";
            referencedColumns: ["id"];
          }
        ];
      };
      technology: {
        Row: Technology;
        Insert: PartialExcept<
          Technology,
          "name" | "icon_url" | "is_core" | "about_id"
        >;
        Update: Partial<Technology>;
        Relationships: [
          {
            foreignKeyName: "technology_about_id_fkey";
            columns: ["about_id"];
            isOneToOne: false;
            referencedRelation: "about";
            referencedColumns: ["id"];
          }
        ];
      };
      address: {
        Row: Address;
        Insert: PartialExcept<Address, "about_id" | "address" | "type">;
        Update: Partial<Address>;
        Relationships: [
          {
            foreignKeyName: "address_about_id_fkey";
            columns: ["about_id"];
            isOneToOne: false;
            referencedRelation: "about";
            referencedColumns: ["id"];
          }
        ];
      };
      link: {
        Row: Link;
        Insert: PartialExcept<Link, "about_id" | "link" | "type">;
        Update: Partial<Link>;
        Relationships: [
          {
            foreignKeyName: "link_about_id_fkey";
            columns: ["about_id"];
            isOneToOne: false;
            referencedRelation: "about";
            referencedColumns: ["id"];
          }
        ];
      };
      about: {
        Row: About;
        Insert: PartialExcept<
          About,
          "short_description" | "early_life" | "goals" | "overview"
        >;
        Update: Partial<About>;
        Relationships: [];
      };
    };
    Views: {
      [_ in never]: never;
    };
    Functions: {
      [_ in never]: never;
    };
    Enums: {
      content_status_enum: "pending" | "completed" | "hold" | "dropped";
      content_type_enum: "project" | "work-experience";
      tech_category_enum:
        | "language"
        | "automation"
        | "cicd"
        | "cloud"
        | "database"
        | "design"
        | "documentation"
        | "frameworks"
        | "re"
        | "state"
        | "styling"
        | "tests"
        | "web3";
    };
    CompositeTypes: {
      [_ in never]: never;
    };
  };
};

type PublicSchema = Database[Extract<keyof Database, "public">];

export type Tables<
  PublicTableNameOrOptions extends
    | keyof (PublicSchema["Tables"] & PublicSchema["Views"])
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
        Database[PublicTableNameOrOptions["schema"]]["Views"])
    : never = never
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
      Database[PublicTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R;
    }
    ? R
    : never
  : PublicTableNameOrOptions extends keyof (PublicSchema["Tables"] &
      PublicSchema["Views"])
  ? (PublicSchema["Tables"] &
      PublicSchema["Views"])[PublicTableNameOrOptions] extends {
      Row: infer R;
    }
    ? R
    : never
  : never;

export type TablesInsert<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I;
    }
    ? I
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
  ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
      Insert: infer I;
    }
    ? I
    : never
  : never;

export type TablesUpdate<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U;
    }
    ? U
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
  ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
      Update: infer U;
    }
    ? U
    : never
  : never;

export type Enums<
  PublicEnumNameOrOptions extends
    | keyof PublicSchema["Enums"]
    | { schema: keyof Database },
  EnumName extends PublicEnumNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicEnumNameOrOptions["schema"]]["Enums"]
    : never = never
> = PublicEnumNameOrOptions extends { schema: keyof Database }
  ? Database[PublicEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : PublicEnumNameOrOptions extends keyof PublicSchema["Enums"]
  ? PublicSchema["Enums"][PublicEnumNameOrOptions]
  : never;

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof PublicSchema["CompositeTypes"]
    | { schema: keyof Database },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof Database;
  }
    ? keyof Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never
> = PublicCompositeTypeNameOrOptions extends { schema: keyof Database }
  ? Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof PublicSchema["CompositeTypes"]
  ? PublicSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
  : never;
