export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  public: {
    Tables: {
      categories: {
        Row: {
          description_en: string | null
          description_es: string | null
          id: number
          name_en: string | null
          name_es: string | null
        }
        Insert: {
          description_en?: string | null
          description_es?: string | null
          id: number
          name_en?: string | null
          name_es?: string | null
        }
        Update: {
          description_en?: string | null
          description_es?: string | null
          id?: number
          name_en?: string | null
          name_es?: string | null
        }
        Relationships: []
      }
      phrases: {
        Row: {
          audio: string | null
          category_id: number | null
          en: string | null
          es: string | null
          id: number
        }
        Insert: {
          audio?: string | null
          category_id?: number | null
          en?: string | null
          es?: string | null
          id: number
        }
        Update: {
          audio?: string | null
          category_id?: number | null
          en?: string | null
          es?: string | null
          id?: number
        }
        Relationships: [
          {
            foreignKeyName: "phrases_category_id_fkey"
            columns: ["category_id"]
            isOneToOne: false
            referencedRelation: "categories"
            referencedColumns: ["id"]
          },
        ]
      }
      song_phrases: {
        Row: {
          en: string
          es: string
          example_en: string
          example_es: string
          id: number
          keyword: string
          song_id: number
          time: string
        }
        Insert: {
          en: string
          es: string
          example_en: string
          example_es: string
          id?: number
          keyword: string
          song_id: number
          time: string
        }
        Update: {
          en?: string
          es?: string
          example_en?: string
          example_es?: string
          id?: number
          keyword?: string
          song_id?: number
          time?: string
        }
        Relationships: [
          {
            foreignKeyName: "song_phrases_song_id_fkey"
            columns: ["song_id"]
            isOneToOne: false
            referencedRelation: "songs"
            referencedColumns: ["id"]
          },
        ]
      }
      songs: {
        Row: {
          artist: string
          id: number
          title: string
          url: string | null
        }
        Insert: {
          artist: string
          id?: number
          title: string
          url?: string | null
        }
        Update: {
          artist?: string
          id?: number
          title?: string
          url?: string | null
        }
        Relationships: []
      }
      word_phrases: {
        Row: {
          audio_url: string | null
          created_at: string
          id: number
          phrase: string
          phrase_es: string | null
          word_id: number | null
        }
        Insert: {
          audio_url?: string | null
          created_at?: string
          id?: number
          phrase: string
          phrase_es?: string | null
          word_id?: number | null
        }
        Update: {
          audio_url?: string | null
          created_at?: string
          id?: number
          phrase?: string
          phrase_es?: string | null
          word_id?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "word_phrases_word_id_fkey"
            columns: ["word_id"]
            isOneToOne: false
            referencedRelation: "words"
            referencedColumns: ["id"]
          },
        ]
      }
      word_types: {
        Row: {
          created_at: string
          description: string | null
          emoji: string | null
          id: number
          type: string
        }
        Insert: {
          created_at?: string
          description?: string | null
          emoji?: string | null
          id?: number
          type: string
        }
        Update: {
          created_at?: string
          description?: string | null
          emoji?: string | null
          id?: number
          type?: string
        }
        Relationships: []
      }
      words: {
        Row: {
          created_at: string
          id: number
          word: string
          word_type_id: number | null
        }
        Insert: {
          created_at?: string
          id?: number
          word: string
          word_type_id?: number | null
        }
        Update: {
          created_at?: string
          id?: number
          word?: string
          word_type_id?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "words_type_id_fkey"
            columns: ["word_type_id"]
            isOneToOne: false
            referencedRelation: "word_types"
            referencedColumns: ["id"]
          },
        ]
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type PublicSchema = Database[Extract<keyof Database, "public">]

export type Tables<
  PublicTableNameOrOptions extends
    | keyof (PublicSchema["Tables"] & PublicSchema["Views"])
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
        Database[PublicTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
      Database[PublicTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : PublicTableNameOrOptions extends keyof (PublicSchema["Tables"] &
        PublicSchema["Views"])
    ? (PublicSchema["Tables"] &
        PublicSchema["Views"])[PublicTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
    ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
    ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  PublicEnumNameOrOptions extends
    | keyof PublicSchema["Enums"]
    | { schema: keyof Database },
  EnumName extends PublicEnumNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = PublicEnumNameOrOptions extends { schema: keyof Database }
  ? Database[PublicEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : PublicEnumNameOrOptions extends keyof PublicSchema["Enums"]
    ? PublicSchema["Enums"][PublicEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof PublicSchema["CompositeTypes"]
    | { schema: keyof Database },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends { schema: keyof Database }
  ? Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof PublicSchema["CompositeTypes"]
    ? PublicSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never
